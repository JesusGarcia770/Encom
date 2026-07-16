import crypto from "crypto"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import usersModel from "../Models/users.js"
import {config} from "../../config.js"
import {COOKIE_NAME} from "../utils/authMiddleware.js"
import {sendResetPasswordEmail} from "../utils/mailer.js"

const authController = {}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000 // 7 días
const RESET_TOKEN_MAX_AGE = 60 * 60 * 1000 // 1 hora

function signAndSetCookie(res, user) {
    const token = jwt.sign({id: user._id, role: user.role}, config.JWT.secret, {expiresIn: "7d"})
    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        secure: process.env.NODE_ENV === "production"
    })
}

function sanitizeUser(user) {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
    }
}

authController.register = async (req, res) => {
    try {
        const name = req.body.name?.trim()
        const email = req.body.email?.trim().toLowerCase()
        const password = req.body.password

        if (!name || !email || !password) {
            return res.status(400).json({message: "Nombre, correo y contraseña son obligatorios"})
        }
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({message: "Correo inválido"})
        }
        if (password.length < 6) {
            return res.status(400).json({message: "La contraseña debe tener al menos 6 caracteres"})
        }

        const existing = await usersModel.findOne({email})
        if (existing) {
            return res.status(409).json({message: "Ya existe una cuenta con ese correo"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await usersModel.create({
            name,
            email,
            password: hashedPassword,
            role: "cliente"
        })

        signAndSetCookie(res, newUser)
        return res.status(201).json({message: "Cuenta creada", user: sanitizeUser(newUser)})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

authController.login = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase()
        const password = req.body.password

        if (!email || !password) {
            return res.status(400).json({message: "Correo y contraseña son obligatorios"})
        }

        const user = await usersModel.findOne({email}).select("+password")
        if (!user) {
            return res.status(401).json({message: "Credenciales incorrectas"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({message: "Credenciales incorrectas"})
        }

        signAndSetCookie(res, user)
        return res.status(200).json({message: "Sesión iniciada", user: sanitizeUser(user)})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

authController.logout = async (req, res) => {
    res.clearCookie(COOKIE_NAME)
    return res.status(200).json({message: "Sesión cerrada"})
}

authController.me = async (req, res) => {
    try {
        const user = await usersModel.findById(req.user.id)
        if (!user) {
            return res.status(401).json({message: "No autenticado"})
        }
        return res.status(200).json({user: sanitizeUser(user)})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

authController.setupAdmin = async (req, res) => {
    try {
        const adminCount = await usersModel.countDocuments({role: "admin"})
        if (adminCount > 0) {
            return res.status(403).json({message: "Ya existe un administrador registrado"})
        }

        const nombre = req.body.nombre?.trim()
        const apellido = req.body.apellido?.trim()
        const telefono = req.body.telefono?.trim()
        const correo = req.body.correo?.trim().toLowerCase()
        const password = req.body.password

        if (!nombre || !apellido || !telefono || !correo || !password) {
            return res.status(400).json({message: "Completa todos los campos"})
        }
        if (!EMAIL_REGEX.test(correo)) {
            return res.status(400).json({message: "Correo inválido"})
        }
        if (password.length < 6) {
            return res.status(400).json({message: "La contraseña debe tener al menos 6 caracteres"})
        }

        const existing = await usersModel.findOne({email: correo})
        if (existing) {
            return res.status(409).json({message: "Ya existe una cuenta con ese correo"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newAdmin = await usersModel.create({
            name: `${nombre} ${apellido}`.trim(),
            email: correo,
            password: hashedPassword,
            phone: telefono,
            role: "admin"
        })

        signAndSetCookie(res, newAdmin)
        return res.status(201).json({message: "Administrador creado", user: sanitizeUser(newAdmin)})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

authController.forgotPassword = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase()

        if (!email || !EMAIL_REGEX.test(email)) {
            return res.status(400).json({message: "Correo inválido"})
        }

        const user = await usersModel.findOne({email})

        if (user) {
            const rawToken = crypto.randomBytes(32).toString("hex")
            const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex")

            user.resetPasswordToken = hashedToken
            user.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_MAX_AGE)
            await user.save()

            const basePath = user.role === "admin" ? "/admin/reset-password" : "/reset-password"
            const resetUrl = `${config.frontendUrl}${basePath}/${rawToken}`

            try {
                await sendResetPasswordEmail(user.email, resetUrl)
            } catch (mailError) {
                // El token ya quedó guardado; un fallo del proveedor de correo no debe romper
                // la respuesta genérica ni filtrar si la cuenta existe.
                console.log("error sending reset email:", mailError)
            }
        }

        // Mismo mensaje exista o no la cuenta, para no filtrar qué correos están registrados
        return res.status(200).json({message: "Si el correo existe, te enviamos un enlace de recuperación"})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

authController.resetPassword = async (req, res) => {
    try {
        const token = req.body.token
        const password = req.body.password

        if (!token || !password) {
            return res.status(400).json({message: "Token y contraseña son obligatorios"})
        }
        if (password.length < 6) {
            return res.status(400).json({message: "La contraseña debe tener al menos 6 caracteres"})
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
        const user = await usersModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: {$gt: new Date()}
        }).select("+resetPasswordToken +resetPasswordExpires")

        if (!user) {
            return res.status(400).json({message: "El enlace es inválido o ya expiró"})
        }

        user.password = await bcrypt.hash(password, 10)
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()

        signAndSetCookie(res, user)
        return res.status(200).json({message: "Contraseña actualizada", user: sanitizeUser(user)})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

authController.adminExists = async (req, res) => {
    try {
        const exists = await usersModel.exists({role: "admin"})
        return res.status(200).json({exists: Boolean(exists)})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default authController

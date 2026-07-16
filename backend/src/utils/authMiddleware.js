import jwt from "jsonwebtoken"
import {config} from "../../config.js"

export const COOKIE_NAME = "encom_token"

export function verifyToken(req, res, next) {
    const token = req.cookies?.[COOKIE_NAME]

    if (!token) {
        return res.status(401).json({message: "No autenticado"})
    }

    try {
        const payload = jwt.verify(token, config.JWT.secret)
        req.user = {id: payload.id, role: payload.role}
        next()
    } catch (error) {
        return res.status(401).json({message: "Sesión inválida o expirada"})
    }
}

export function requireAdmin(req, res, next) {
    if (req.user?.role !== "admin") {
        return res.status(403).json({message: "No tienes permisos de administrador"})
    }
    next()
}

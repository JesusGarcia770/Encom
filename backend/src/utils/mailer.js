import nodemailer from "nodemailer"
import {config} from "../../config.js"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email.user_email,
        pass: config.email.user_password
    }
})

export async function sendResetPasswordEmail(to, resetUrl) {
    return transporter.sendMail({
        from: `"Encom" <${config.email.user_email}>`,
        to,
        subject: "Recupera tu contraseña - Encom",
        html: `
            <p>Recibimos una solicitud para restablecer tu contraseña.</p>
            <p><a href="${resetUrl}">Haz clic aquí para crear una nueva contraseña</a></p>
            <p>Este enlace expira en 1 hora. Si tú no solicitaste esto, puedes ignorar este correo.</p>
        `
    })
}

import crypto from "crypto"
import { config } from "../../config.js"

const AUTH_URL = "https://id.wompi.sv/connect/token"
const API_URL = "https://api.wompi.sv"

export class WompiValidationError extends Error {}

let cachedToken = null
let cachedTokenExpiresAt = 0

async function getAccessToken() {
    if (cachedToken && Date.now() < cachedTokenExpiresAt) {
        return cachedToken
    }

    const body = new URLSearchParams({
        grant_type: config.wompi.grant_type,
        client_id: config.wompi.client_id,
        client_secret: config.wompi.client_secret,
        audience: config.wompi.audience,
    })

    const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    })

    if (!res.ok) {
        throw new Error(`Wompi auth failed: ${res.status}`)
    }

    const data = await res.json()
    cachedToken = data.access_token
    cachedTokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000

    return cachedToken
}

export async function createPaymentLink({ identificador, monto, nombreProducto, urlRedirect, urlWebhook, emailsNotificacion }) {
    const token = await getAccessToken()

    const configuracion = {
        urlRedirect,
        notificarTransaccionCliente: false,
    }

    if (urlWebhook) {
        configuracion.urlWebhook = urlWebhook
    }

    if (emailsNotificacion) {
        configuracion.emailsNotificacion = emailsNotificacion
    }

    const res = await fetch(`${API_URL}/EnlacePago`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            identificadorEnlaceComercio: identificador,
            monto,
            nombreProducto,
            formaPago: { permitirTarjetaCreditoDebido: true },
            Configuracion: configuracion,
        }),
    })

    if (!res.ok) {
        const errorBody = await res.text()

        if (res.status === 400) {
            try {
                const parsed = JSON.parse(errorBody)
                const messages = parsed.mensajes?.join(" ") || parsed.mensaje
                if (messages) {
                    throw new WompiValidationError(messages)
                }
            } catch (parseError) {
                if (parseError instanceof WompiValidationError) throw parseError
            }
        }

        throw new Error(`Wompi createPaymentLink failed: ${res.status} ${errorBody}`)
    }

    return res.json()
}

export async function getTransaction(idTransaccion) {
    const token = await getAccessToken()

    const res = await fetch(`${API_URL}/TransaccionCompra/${idTransaccion}`, {
        headers: { authorization: `Bearer ${token}` },
    })

    if (!res.ok) {
        throw new Error(`Wompi getTransaction failed: ${res.status}`)
    }

    return res.json()
}

export function computeHash(parts) {
    return crypto
        .createHmac("sha256", config.wompi.client_secret)
        .update(parts.join(""))
        .digest("hex")
}

export function verifyRedirectHash({ identificadorEnlaceComercio, idTransaccion, idEnlace, monto, hash }) {
    const expected = computeHash([identificadorEnlaceComercio, idTransaccion, idEnlace, monto])
    return expected === hash
}

export function verifyWebhookHash(rawBody, hash) {
    const expected = crypto
        .createHmac("sha256", config.wompi.client_secret)
        .update(rawBody)
        .digest("hex")
    return expected === hash
}

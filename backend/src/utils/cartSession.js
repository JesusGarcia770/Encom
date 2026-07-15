import crypto from "crypto"

const COOKIE_NAME = "cart_sid"
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000 // 30 días

export default function cartSession(req, res, next) {
    let sessionId = req.cookies?.[COOKIE_NAME]

    if (!sessionId) {
        sessionId = crypto.randomUUID()
        res.cookie(COOKIE_NAME, sessionId, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: COOKIE_MAX_AGE,
        })
    }

    req.cartSessionId = sessionId
    next()
}

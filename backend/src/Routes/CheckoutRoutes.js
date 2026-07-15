import express from "express"
import checkoutController from "../Controllers/CheckoutController.js"
import cartSession from "../utils/cartSession.js"

const router = express.Router()

router.post("/", cartSession, checkoutController.createCheckout)
router.get("/return", checkoutController.confirmReturn)
router.post("/webhook", checkoutController.webhook)

export default router

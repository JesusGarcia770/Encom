import express from "express"
import cartController from "../Controllers/CartController.js"
import cartSession from "../utils/cartSession.js"

const router = express.Router()

router.use(cartSession)

router.route("/")
.get(cartController.getCart)
.delete(cartController.clearCart)

router.route("/items")
.post(cartController.addItem)

router.route("/items/:productId")
.put(cartController.updateItem)
.delete(cartController.removeItem)

export default router

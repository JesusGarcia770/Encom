import cartModel from "../Models/cart.js"
import orderModel from "../Models/order.js"
import productsModel from "../Models/products.js"
import { createPaymentLink, getTransaction, verifyRedirectHash, verifyWebhookHash, WompiValidationError } from "../utils/wompiClient.js"
import { config } from "../../config.js"

const checkoutController = {}

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"
const WEBHOOK_URL = process.env.WOMPI_WEBHOOK_URL || null
const MAX_WOMPI_AMOUNT = 1000

async function finalizeOrder(order, idTransaccion) {
    if (order.status === "paid") {
        return order
    }

    const transaction = await getTransaction(idTransaccion)
    order.wompi.idTransaccion = idTransaccion

    if (transaction.esAprobada) {
        for (const item of order.items) {
            await productsModel.updateOne(
                { _id: item.product_id },
                { $inc: { stock: -item.quantity } }
            )
        }

        await cartModel.updateOne({ session_id: order.session_id }, { items: [] })

        order.status = "paid"
    } else {
        order.status = "failed"
    }

    await order.save()
    return order
}

checkoutController.createCheckout = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ session_id: req.cartSessionId }).populate("items.product_id")

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" })
        }

        for (const item of cart.items) {
            if (item.quantity > item.product_id.stock) {
                return res.status(400).json({ message: `Not enough stock for ${item.product_id.name}` })
            }
        }

        const total = cart.items.reduce((acc, item) => acc + item.product_id.price * item.quantity, 0)

        if (total > MAX_WOMPI_AMOUNT) {
            return res.status(400).json({
                message: `El monto máximo permitido por Wompi es $${MAX_WOMPI_AMOUNT.toFixed(2)} por compra. Reduce la cantidad de productos en tu carrito.`
            })
        }

        const order = new orderModel({
            session_id: req.cartSessionId,
            items: cart.items.map(item => ({
                product_id: item.product_id._id,
                name: item.product_id.name,
                price: item.product_id.price,
                quantity: item.quantity,
            })),
            total,
        })
        await order.save()

        let paymentLink
        try {
            paymentLink = await createPaymentLink({
                identificador: order._id.toString(),
                monto: total,
                nombreProducto: `Pedido ENCOM #${order._id.toString().slice(-6)}`,
                urlRedirect: `${FRONTEND_URL}/checkout/return`,
                urlWebhook: WEBHOOK_URL,
                emailsNotificacion: WEBHOOK_URL ? null : config.email.user_email,
            })
        } catch (error) {
            await orderModel.deleteOne({ _id: order._id })

            if (error instanceof WompiValidationError) {
                return res.status(400).json({ message: error.message })
            }

            throw error
        }

        order.wompi.idEnlace = paymentLink.idEnlace
        order.wompi.urlEnlace = paymentLink.urlEnlace
        await order.save()

        return res.status(200).json({ checkoutUrl: paymentLink.urlEnlace, orderId: order._id })
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

checkoutController.confirmReturn = async (req, res) => {
    try {
        const { identificadorEnlaceComercio, idTransaccion, idEnlace, monto, hash } = req.query

        if (!identificadorEnlaceComercio || !idTransaccion || !idEnlace || !monto || !hash) {
            return res.status(400).json({ message: "Missing parameters" })
        }

        const isValid = verifyRedirectHash({ identificadorEnlaceComercio, idTransaccion, idEnlace, monto, hash })

        if (!isValid) {
            return res.status(400).json({ message: "Invalid signature" })
        }

        const order = await orderModel.findById(identificadorEnlaceComercio)

        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        const updatedOrder = await finalizeOrder(order, idTransaccion)

        return res.status(200).json({ status: updatedOrder.status, order: updatedOrder })
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

checkoutController.webhook = async (req, res) => {
    try {
        const hash = req.headers["wompi_hash"]

        if (!hash || !req.rawBody || !verifyWebhookHash(req.rawBody, hash)) {
            return res.status(400).json({ message: "Invalid signature" })
        }

        const body = req.body
        const enlace = body.EnlacePago || body.enlacePago || {}
        const orderId = enlace.IdentificadorEnlaceComercio || enlace.identificadorEnlaceComercio
        const idTransaccion = body.IdTransaccion || body.idTransaccion

        if (!orderId || !idTransaccion) {
            return res.status(200).json({ received: true })
        }

        const order = await orderModel.findById(orderId)

        if (order) {
            await finalizeOrder(order, idTransaccion)
        }

        return res.status(200).json({ received: true })
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export default checkoutController

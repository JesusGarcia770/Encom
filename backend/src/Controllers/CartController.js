import cartModel from "../Models/cart.js"
import productsModel from "../Models/products.js"

const cartController = {}

async function getOrCreateCart(sessionId) {
    let cart = await cartModel.findOne({ session_id: sessionId })

    if (!cart) {
        cart = new cartModel({ session_id: sessionId, items: [] })
        await cart.save()
    }

    return cart
}

async function populatedCart(sessionId) {
    return cartModel.findOne({ session_id: sessionId }).populate("items.product_id")
}

cartController.getCart = async (req, res) => {
    try {
        await getOrCreateCart(req.cartSessionId)
        const cart = await populatedCart(req.cartSessionId)

        return res.status(200).json(cart)
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

cartController.addItem = async (req, res) => {
    try {
        const { product_id, quantity } = req.body
        const qtyToAdd = Number(quantity) || 1

        if (!product_id) {
            return res.status(400).json({ message: "product_id required" })
        }

        if (qtyToAdd < 1) {
            return res.status(400).json({ message: "quantity must be at least 1" })
        }

        const product = await productsModel.findById(product_id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        const cart = await getOrCreateCart(req.cartSessionId)
        const existingItem = cart.items.find(item => item.product_id.toString() === product_id)
        const newQuantity = (existingItem?.quantity || 0) + qtyToAdd

        if (newQuantity > product.stock) {
            return res.status(400).json({ message: "Not enough stock available" })
        }

        if (existingItem) {
            existingItem.quantity = newQuantity
        } else {
            cart.items.push({ product_id, quantity: newQuantity })
        }

        await cart.save()

        return res.status(200).json(await populatedCart(req.cartSessionId))
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

cartController.updateItem = async (req, res) => {
    try {
        const { productId } = req.params
        const { action } = req.body

        if (!["increment", "decrement"].includes(action)) {
            return res.status(400).json({ message: "action must be 'increment' or 'decrement'" })
        }

        const cart = await getOrCreateCart(req.cartSessionId)
        const item = cart.items.find(i => i.product_id.toString() === productId)

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" })
        }

        if (action === "increment") {
            const product = await productsModel.findById(productId)

            if (!product) {
                return res.status(404).json({ message: "Product not found" })
            }

            if (item.quantity + 1 > product.stock) {
                return res.status(400).json({ message: "Not enough stock available" })
            }

            item.quantity += 1
        } else {
            item.quantity -= 1

            if (item.quantity <= 0) {
                cart.items = cart.items.filter(i => i.product_id.toString() !== productId)
            }
        }

        await cart.save()

        return res.status(200).json(await populatedCart(req.cartSessionId))
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

cartController.removeItem = async (req, res) => {
    try {
        const { productId } = req.params
        const cart = await getOrCreateCart(req.cartSessionId)

        cart.items = cart.items.filter(i => i.product_id.toString() !== productId)

        await cart.save()

        return res.status(200).json(await populatedCart(req.cartSessionId))
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

cartController.clearCart = async (req, res) => {
    try {
        const cart = await getOrCreateCart(req.cartSessionId)

        cart.items = []

        await cart.save()

        return res.status(200).json(await populatedCart(req.cartSessionId))
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export default cartController

import producsModel from "../Models/products.js"
import {v2 as cloudinary} from "cloudinary"

const productsController = {}

productsController.getProducts = async (req, res) => {
    try {
        const products = await producsModel.find()
        return res.status(200).json(products)
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

productsController.insertProduct = async (req, res) => {
    try {
        const {name, category_id, price, stock} = req.body

        name = name?.trim()

        if (!category_id) {
            return res.status(400).json({message: "category id required"})
        }

        if (price < 0) {
            return res.status(400).json({message: "Price not valid"})
        }

        if (stock < 0) {
            res.status(400).json({message: "stock can't be lower than 0"})
        }

        const newProduct = await producsModel({
            name,
            category_id,
            price,
            stock,
            image: req.file.path,
            public_id: req.file.filename,
            created_at: new Date()
        })

        await newProduct.save()

        return res.status(200).json({message: "Product saved"})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

productsController.updateProduct = async (req, res) => {
    try {
        const {name, category_id, price, stock} = req.body

        name = name?.trim()

        if (!category_id) {
            return res.status(400).json({message: "category id required"})
        }

        if (price < 0) {
            return res.status(400).json({message: "Price not valid"})
        }

        if (stock < 0) {
            res.status(400).json({message: "stock can't be lower than 0"})
        }

        const productFound = await producsModel.findById(req.params.id)

        if (!productFound) {
            return res.status(400).json({message: "Product not found"})
        }

        const updateData = {
            name,
            category_id,
            price,
            stock
        }

        if (req.file) {
            await cloudinary.uploader.destroy(productFound.public_id)

            updateData.image = req.file.path
            updateData.public_id = req.file.filename
        }

        await producsModel.findByIdAndUpdate(req.params.id, updateData, {new: true})

        return res.status(200).json({message: "Product updated"})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

productsController.deleteProduct = async (req, res) => {
    try {
        const productFound = await producsModel.findById(req.params.id)

        if (!productFound) {
            return res.status(400).json({message: "Product not found"})
        }

        await cloudinary.uploader.destroy(productFound.public_id)

        await producsModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Product deleted"})
    } catch (erro) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default productsController
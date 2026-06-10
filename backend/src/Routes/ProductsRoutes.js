import express from "express"
import productsController from "../Controllers/ProductsController.js";
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(productsController.getProducts)
.post(productsController.insertProduct)

router.route("/:id")
.put(upload.single("image"), productsController.updateProduct)
.delete(productsController.deleteProduct)

export default router
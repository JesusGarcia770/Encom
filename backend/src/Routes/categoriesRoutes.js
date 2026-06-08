import express from "express"
import categoriesController from "../Controllers/CategoriesController.js"

const router = express.Router()

router.route("/")
.get(categoriesController.getCategories)
.post(categoriesController.insertCategory)

router.route("/:id")
.put(categoriesController.updateCategory)
.delete(categoriesController.deleteCategory)

export default router
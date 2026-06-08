import categoriesModel from "../Models/categories.js"

const categoriesController = {}

categoriesController.getCategories = async (req, res) => {
    try {
        const categories = categoriesModel.find()
        return res.status(200).json(categories)
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

categoriesController.insertCategory = async (req, res) => {
    try {
        const {name} = req.body

        name = name?.trim()

        if (!name) {
            return res.status(400).json({message: "Name required"})
        }

        const newCategory = new categoriesModel({
            name,
            created_at: new Date()
        })

        newCategory.save()

        return res.status(200).json({message: "Category saved"})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

categoriesController.updateCategory = async (req, res) => {
    try {
        const {name} = req.body

        name = name?.trim()

        if (!name) {
            return res.status(400).json({message: "Name required"})
        }

        const updatedCategory = await categoriesModel.findByIdAndUpdate(req.params.id, {name}, {new: true})

        if (!updatedCategory) {
            return res.status(400).json({message: "Category not found"})
        }

        return res.status(200).json({message: "Category updated"})
    } catch {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

categoriesController.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await categoriesModel.findByIdAndDelete(req.params.id)

        if (!deletedCategory) {
            return res.status(400).json({message: "Category not found"})
        }

        return res.status(200).json({message: "Category deleted"})
    } catch {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default categoriesController
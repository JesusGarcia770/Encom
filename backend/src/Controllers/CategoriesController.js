import categoriesModel from "../Models/categories.js"

const categoriesController = {}

categoriesController.getCategories = async (req, res) => {
    try {
        const categories = await categoriesModel.find();
        return res.status(200).json(categories);
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

categoriesController.insertCategory = async (req, res) => {
    try {
        const {name, description, status} = req.body;

        const newCategory = new categoriesModel({
            name,
            description,
            status
        })

        await newCategory.save()

        return res.status(200).json({message: "Category saved"})
    } catch (error) {
        console.log("error:"+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}

categoriesController.updateCategory = async (req, res) => {
    try {
        const {name, description, status} = req.body

        const updatedCategory = await categoriesModel.findByIdAndUpdate(req.params.id, {name, description, status}, {new: true})

        if (!updatedCategory) {
            return res.status(400).json({message: "Category not found"})
        }

        return res.status(200).json({message: "Category updated"})
    } catch (error) {
        console.log("error:"+ error)
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
    } catch (error) {
        console.log("error:"+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default categoriesController
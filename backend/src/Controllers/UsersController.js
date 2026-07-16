import bcrypt from "bcryptjs"
import usersModel from "../Models/users.js"

const usersController = {}

usersController.getUsers = async (req, res) => {
    try {
        const users = await usersModel.find()
        return res.status(200).json(users)
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

usersController.updateUser = async (req, res) => {
    try {
        const name = req.body.name?.trim()
        const email = req.body.email?.trim()
        const password = req.body.password

        if (!name || !email) {
            return res.status(400).json({message: "Fields required"})
        }

        const update = {name, email}
        if (password) {
            update.password = await bcrypt.hash(password, 10)
        }

        const userUpdated = await usersModel.findByIdAndUpdate(req.params.id, update, {new: true})

        if (!userUpdated) {
            return res.status(404).json({message: "User not found"})
        }

        return res.status(200).json({message: "User updated", userUpdated})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

usersController.deleteUser = async (req, res) => {
    try {
        const deletedUser = await usersModel.findByIdAndDelete(req.params.id)

        if (!deletedUser) {
            return res.status(404).json({message: "User not found"})
        }

        return res.status(200).json({messsage: "User deleted"})
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default usersController

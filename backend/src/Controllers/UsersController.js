import users from "../Models/users.js"
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
        const {name, email, password} = req.body

        name?.trim()
        email?.trim()

        const userUpdated = await usersModel.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password
        }, {new: true})

        if (!updateUser) {
            return res.status(404).json("User not found")
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
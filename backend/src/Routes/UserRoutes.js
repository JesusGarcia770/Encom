import express from "express"
import userController from "../Controllers/UsersController.js"
import {verifyToken, requireAdmin} from "../utils/authMiddleware.js"

const router = express.Router()

router.use(verifyToken, requireAdmin)

router.route("/")
.get(userController.getUsers)

router.route("/:id")
.put(userController.updateUser)
.delete(userController.deleteUser)

export default router

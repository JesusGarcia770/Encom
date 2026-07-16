import express from "express"
import authController from "../Controllers/AuthController.js"
import {verifyToken} from "../utils/authMiddleware.js"

const router = express.Router()

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.get("/me", verifyToken, authController.me)
router.post("/setup-admin", authController.setupAdmin)
router.get("/admin-exists", authController.adminExists)
router.post("/forgot-password", authController.forgotPassword)
router.post("/reset-password", authController.resetPassword)

export default router

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productsRoutes from "./src/Routes/ProductsRoutes.js"
import categoriesRoutes from "./src/Routes/categoriesRoutes.js"
import userRoutes from "./src/Routes/UserRoutes.js"
import cartRoutes from "./src/Routes/CartRoutes.js"
import checkoutRoutes from "./src/Routes/CheckoutRoutes.js"
import authRoutes from "./src/Routes/AuthRoutes.js"

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(cookieParser());

app.use(express.json({
    verify: (req, res, buf) => { req.rawBody = buf }
}));

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/categories", categoriesRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/checkout", checkoutRoutes)

export default app
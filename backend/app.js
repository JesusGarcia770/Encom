import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productsRoutes from "./src/Routes/ProductsRoutes.js"
import categoriesRoutes from "./src/Routes/categoriesRoutes.js"
import userRoutes from "./src/Routes/UserRoutes.js"

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());

app.use("/api/users", userRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/categories", categoriesRoutes)

export default app
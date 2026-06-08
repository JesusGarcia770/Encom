import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productsRoutes from "./src/Routes/ProductsRoutes.js"

const app = express();

app.use(cors({
    origin: ["https://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());

app.use("/api/users")
app.use("/api/products", productsRoutes)

export default app
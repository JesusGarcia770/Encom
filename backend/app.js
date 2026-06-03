import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: ["https://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());

app.use("/api/users")

export default app
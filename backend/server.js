import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
connectDb();

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Mern app listening on port ${PORT}`));

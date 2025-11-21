import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import { basicAuth } from "./middleware/auth.js";

dotenv.config();

const app = express();

// 1️⃣ CORS FIRST
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// 2️⃣ JSON PARSER
app.use(express.json());

// 3️⃣ AUTH NEXT
app.use(basicAuth);

// 4️⃣ ROUTES
app.use("/api/tasks", taskRoutes);
app.use("/api/logs", logRoutes);

// 5️⃣ DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// 6️⃣ SERVER LISTEN
app.listen(5000, () => console.log("Server running on port 5000"));

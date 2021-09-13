import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";

import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data
app.use(cors())

app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
    res.send("API is running..");
});


const PORT = process.env.PORT || 4242;

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}..`.blue
  )
);
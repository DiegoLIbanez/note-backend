import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";
import { connectDB } from "./db/connectDB.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server corriendo en el puerto:", PORT);
});

//fr4kcSIOPKYrJggy
//"mongodb+srv://diego:diego2018@cluster0.rncwrrp.mongodb.net/EmpleadosDB?retryWrites=true&w=majority&appName=Cluster0"

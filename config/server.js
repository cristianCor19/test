import express from "express";
import cors from "cors";
import corsOptions from "./corsOptions.js";
import { connectDatabase } from "../database/connect_db.js";
import { PORT } from "./env.js";

// Rutas
import userRoutes from "../V1/routes/user.routes.js";
import authRoutes from "../V1/routes/auth.routes.js";
import projectRoutes from "../V1/routes/project.routes.js";
import movementRoutes from "../V1/routes/movement.routes.js";
import lineRoutes from "../V1/routes/line.routes.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Conectar a la base de datos
connectDatabase();

// Definir rutas
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/project", projectRoutes);
app.use("/movement", movementRoutes);
app.use("/line", lineRoutes);

export default app;

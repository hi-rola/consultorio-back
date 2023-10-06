import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js";
import authRoutes from "./routes/auth.routes.js";
import consultasRoutes from "./routes/consultas.routes.js";
import diagnosticosRoutes from "./routes/diagnostico.routes.js";
import { PORT } from "./config.js";
import cors from "cors";

const app = express();

//middlewares : se ejecuta antes de llegar a las rutas
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", usuariosRoutes);
app.use("/api", consultasRoutes);
app.use("/api", diagnosticosRoutes);

app.use((req, res, next) => {
  res.status(400).json({
    mensaje: "Endpoint no encontrado",
  });
});

app.listen(PORT);
console.log("corriendo en: 3000");

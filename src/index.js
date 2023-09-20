import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js";
import { PORT } from "./config.js";

const app = express();
app.use(express.json());

app.use("/api", usuariosRoutes);

app.use((req, res, next) => {
  res.status(400).json({
    mensaje: "Endpoint no encontrado",
  });
});

app.listen(PORT);
console.log("corriendo en: 3000");

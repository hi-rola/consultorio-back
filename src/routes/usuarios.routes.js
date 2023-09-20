import { Router } from "express";
import {
  getUsuarios,
  createUsuario,
  updateEstadoUsuario,
  getUsuarioById,
  updateUsuario,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.get("/usuarios", getUsuarios);
router.get("/usuarios/:id_usuario", getUsuarioById);
router.post("/usuarios", createUsuario);
router.patch("/usuarios/:id_usuario", updateEstadoUsuario);
router.put("/usuarios/:id_usuario", updateUsuario);

export default router;

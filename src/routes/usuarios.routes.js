import { Router } from "express";
import {
  getUsuarios,
  updateEstadoUsuario,
  getUsuarioById,
  updateUsuario,
} from "../controllers/usuarios.controllers.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/usuarios", validarJWT, getUsuarios);
router.get("/usuarios/:id_usuario", validarJWT, getUsuarioById);
router.patch("/usuarios/:id_usuario", validarJWT, updateEstadoUsuario);
router.put("/usuarios/:id_usuario", validarJWT, updateUsuario);

export default router;

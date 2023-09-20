import { Router } from "express";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.get("/usuarios", getUsuarios);
router.post("/usuarios", createUsuario);
router.put("/usuarios", updateUsuario);
router.delete("/usuarios", deleteUsuario);

export default router;

import { Router } from "express";
import {
  createUsuario,
  login,
  renovarToken,
} from "../controllers/auth.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post("/registrar", createUsuario);
router.post("/login", login);
router.get("/renovarToken", validarJWT, renovarToken);

export default router;

import { Router } from "express";
import {
  getConsultas,
  getConsultasById,
  updateEstadoConsulta,
  createConsulta,
} from "../controllers/consultas.controller.js";

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/consultas", validarJWT, getConsultas);
router.get("/consultas/:id_consulta", validarJWT, getConsultasById);
router.patch("/consultas/:id_consulta", validarJWT, updateEstadoConsulta);
router.post("/consultas", validarJWT, createConsulta);

export default router;

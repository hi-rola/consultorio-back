import { Router } from "express";
import {
  getConsultas,
  getConsultasById,
  updateEstadoConsulta,
  createConsulta,
  getConsultasPorFecha,
  updateConsulta,
  getInformacionUsuarioConsulta,
  getConsultaByIdUsuario,
} from "../controllers/consultas.controller.js";

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/consultas", validarJWT, getConsultas);
router.get("/consultas/:id_consulta", validarJWT, getConsultasById);
router.get("/consultas-fecha/:fecha", validarJWT, getConsultasPorFecha);
router.get(
  "/consultas-usuario/:id_usuario",
  validarJWT,
  getConsultaByIdUsuario
);
router.get(
  "/consultas-info/:id_consulta",
  validarJWT,
  getInformacionUsuarioConsulta
);
router.patch("/consultas/:id_consulta", validarJWT, updateEstadoConsulta);
router.post("/consultas", validarJWT, createConsulta);
router.put("/consultas/:id_consulta", validarJWT, updateConsulta);

export default router;

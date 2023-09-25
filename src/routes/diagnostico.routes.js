import { Router } from "express";
import {
  getDiagnosticos,
  getDiagnosticoByIdUsuario,
  createDiagnostico,
  updateDiagnostico,
} from "../controllers/diagnosticos.controller.js";

const router = Router();

router.get("/diagnosticos", getDiagnosticos);
router.get("/diagnosticos/:id_usuario", getDiagnosticoByIdUsuario);
router.post("/diagnosticos", createDiagnostico);
router.put("/diagnosticos/:id_diagnostico", updateDiagnostico);

export default router;

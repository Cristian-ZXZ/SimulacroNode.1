import { Router } from "express";
import {
  crearEvento,
  obtenerEventos,
  obtenerEventoPorId,
  actualizarEvento,
  eliminarEvento
} from "../controllers/eventoController.ts";

import { verificarToken } from "../middlewares/authMiddleware.ts";
import { verificarRol } from "../middlewares/verificarRol.ts";

const router = Router();

// Rutas públicas
router.get("/", obtenerEventos);
router.get("/:id", obtenerEventoPorId);

// Rutas protegidas (solo admin u organizadores)
router.post("/", verificarToken, verificarRol(["organizador", "admin"]), crearEvento);
router.put("/:id", verificarToken, verificarRol(["organizador", "admin"]), actualizarEvento);
router.delete("/:id", verificarToken, verificarRol(["admin"]), eliminarEvento);

export default router;

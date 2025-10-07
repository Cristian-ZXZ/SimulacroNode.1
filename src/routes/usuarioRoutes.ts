import { Router } from "express";
import { registrarUsuario, loginUsuario } from "../controllers/usuarioController.ts";
import { verificarToken } from "../middlewares/authMiddleware.ts";
import { verificarRol } from "../middlewares/verificarRol.ts";

const router = Router()

router.post("/registro", registrarUsuario)
router.post("/login", loginUsuario)

router.get("/perfil", verificarToken, (req, res) => {
  const usuario = (req as any).usuario; 
  res.json({
    message: "Perfil accedido con éxito",
    usuario,
  });
});

router.get(
  "/admin",
  verificarToken,
  verificarRol(["admin"]),
  (req, res) => {
    res.json({ message: "Bienvenido, administrador" });
  }
);
export default router

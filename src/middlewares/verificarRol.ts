import { type Request, type Response, type NextFunction } from "express";

export const verificarRol = (rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const usuario = (req as any).usuario;

    if (!usuario) {
      return res.status(401).json({ error: "Token inválido o usuario no encontrado" });
    }

    if (!rolesPermitidos.includes(usuario.rol)) {
      return res.status(403).json({ error: "No tienes permisos para acceder a este recurso" });
    }

    next();
  };
};

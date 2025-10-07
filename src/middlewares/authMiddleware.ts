import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  rol: string;
}

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado o inválido" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token no encontrado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded !== "object" || decoded === null) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const payload = decoded as JwtPayload;
    (req as any).usuario = payload;

    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

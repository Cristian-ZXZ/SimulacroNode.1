import { type Request, type Response } from "express";
import Evento from "../models/eventoModel.ts";

// Crear un nuevo evento (solo organizadores o admin)
export const crearEvento = async (req: Request, res: Response) => {
  try {
    const { titulo, descripcion, fecha, ubicacion, capacidad } = req.body;
    const usuario = (req as any).usuario;
    if (!titulo || !descripcion || !fecha || !ubicacion || !capacidad) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    if (new Date(fecha) < new Date()) {
      return res.status(400).json({ error: "La fecha del evento debe ser futura" });
    }

    if (!usuario) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    if (usuario.rol !== "organizador" && usuario.rol !== "admin") {
      return res.status(403).json({ error: "No tienes permisos para crear eventos" });
    }

    const nuevoEvento = await Evento.create({
      titulo,
      descripcion,
      fecha,
      ubicacion,
      capacidad,
      organizadorId: usuario.id, // ✅ campo correcto
    });

    res.status(201).json({
      message: "Evento creado correctamente",
      evento: nuevoEvento,
    });
  } catch (error: any) {
    console.error("Error al crear el evento:", error.message, error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los eventos
export const obtenerEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    res.status(500).json({ error: "Error al obtener eventos" });
  }
};

// Obtener evento por ID
export const obtenerEventoPorId = async (req: Request, res: Response) => {
  try {
    console.log("🔍 Buscando evento con ID:", req.params.id); // 👈 añade esto
    const evento = await Evento.findByPk(req.params.id);

    if (!evento) {
      console.log("⚠️ No se encontró ningún evento con ese ID");
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    res.json(evento);
  } catch (error) {
    console.error("❌ Error al obtener evento:", error);
    res.status(500).json({ error: "Error al obtener evento" });
  }
};


// Actualizar evento
export const actualizarEvento = async (req: Request, res: Response) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) return res.status(404).json({ error: "Evento no encontrado" });

    await evento.update(req.body);
    res.json({ message: "Evento actualizado correctamente", evento });
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    res.status(500).json({ error: "Error al actualizar evento" });
  }
};

// Eliminar evento
export const eliminarEvento = async (req: Request, res: Response) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) return res.status(404).json({ error: "Evento no encontrado" });

    await evento.destroy();
    res.json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    res.status(500).json({ error: "Error al eliminar evento" });
  }
};

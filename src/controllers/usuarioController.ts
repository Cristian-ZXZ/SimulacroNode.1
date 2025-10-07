import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/usuarioModel.ts";
import { validationResult } from "express-validator";



export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    // 1. Extraer datos del req.body
    const { nombre, email, password, rol } = req.body;

    // 2. Verificar si ya existe el email
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya está en uso" });
    }

    // 3. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Crear el usuario en la DB
    await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol
    });

    // 5. Responder con éxito
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    // Manejo de errores
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};
export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password'] } // Excluir la contraseña
    });
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });   
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const errores = validationResult(req);
if (!errores.isEmpty()) {
  return res.status(400).json({ errores: errores.array() });
}

    // 1️⃣ Extraer email y password del body
    const { email, password } = req.body;
    console.log("Datos recibidos:", { email, password });

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    // 2️⃣ Buscar usuario por email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // 3️⃣ Convertir a objeto plano (evita error de bcrypt)
    const usuarioPlano = usuario.get({ plain: true });
    console.log("Usuario encontrado:", usuarioPlano);

    // 4️⃣ Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, usuarioPlano.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // 5️⃣ Generar token JWT
    const token = jwt.sign(
      { id: usuarioPlano.id, rol: usuarioPlano.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // 6️⃣ Responder con token
    return res.status(200).json({
      message: "Login exitoso",
      token,
    });
    
  } catch (error: any) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en login" });
  }
};


import jwt from "jsonwebtoken";
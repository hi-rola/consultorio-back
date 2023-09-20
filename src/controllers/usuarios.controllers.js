import { pool } from "../db.js";

export const getUsuarios = (req, res) => {};

export const createUsuario = async (req, res) => {
  try {
    const { nombre, apellidos, contrasena, correo, rol } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO usuario" +
        "(nombre, apellidos, contrasena, correo, rol) VALUES (?,?,?,?,?)",
      [nombre, apellidos, contrasena, correo, rol]
    );

    res.send({
      id_usuario: rows.insertId,
      nombre,
      apellidos,
      contrasena,
      correo,
      rol,
    });
  } catch (error) {
    res.send({
      mensage: "Correo duplicado",
      error: error.code,
    });
  }
};

export const updateUsuario = (req, res) => res.send("update");

export const deleteUsuario = (req, res) => res.send("delete");

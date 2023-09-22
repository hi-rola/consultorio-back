import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { generarJWT } from "../helpers/jwt.js";

export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const [result] = await pool.query(
      "SELECT contrasena FROM usuario WHERE correo = ?",
      [correo]
    );

    const validPassword = bcrypt.compareSync(contrasena, result[0].contrasena);

    const [rows] = await pool.query("SELECT * FROM usuario WHERE correo = ?", [
      correo,
    ]);

    const token = await generarJWT(
      rows[0].id_usuario,
      rows[0].nombre + " " + rows[0].apellidos
    );

    if (result.length === 1 && validPassword) {
      res.send({
        rows: rows[0],
        token,
      });
    } else {
      res.send({
        mensaje: "Correo y/o contraseña invalidos",
      });
    }
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const saltRounds = 10;
    const { nombre, apellidos, contrasena, correo, rol, estado } = req.body;

    const contrasenaEncriptada = bcrypt.hashSync(contrasena, saltRounds);

    const [result] = await pool.query(
      "SELECT correo from USUARIO where correo = ?",
      [correo]
    );

    if (result[0])
      return res.status(400).send({
        mensaje: "Correo existente, ingrese otro",
      });

    const [rows] = await pool.query(
      "INSERT INTO usuario" +
        "(nombre, apellidos, contrasena, correo, rol, estado) VALUES (?,?,?,?,?,?)",
      [nombre, apellidos, contrasenaEncriptada, correo, rol, estado]
    );

    const token = await generarJWT(rows.insertId, nombre + " " + apellidos);

    res.send({
      id_usuario: rows.id_usuario,
      nombre,
      apellidos,
      contrasenaEncriptada,
      correo,
      rol,
      estado,
      token,
      mensaje: "Usuario registrado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const renovarToken = async (req, res) => {
  try {
    const { id_usuario } = req;

    //buscar usuario en la BD
    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE id_usuario = ?",
      [id_usuario]
    );

    const { nombre, apellidos } = rows[0];

    const token = await generarJWT(id_usuario, nombre + " " + apellidos);

    res.send({
      id_usuario,
      nombre,
      apellidos,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

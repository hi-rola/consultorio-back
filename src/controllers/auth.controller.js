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

    const [rows] = await pool.query(
      "SELECT id_usuario, nombre, apellidos, correo, rol, fecha_creacion, ultima_actualizacion,  estado " +
        "FROM usuario WHERE correo = ?",
      [correo]
    );

    const token = await generarJWT(
      rows[0].id_usuario,
      rows[0].nombre + " " + rows[0].apellidos
    );

    if (result.length === 1 && validPassword) {
      res.send({
        id_usuario: rows[0].id_usuario,
        nombre: rows[0].nombre,
        apellidos: rows[0].apellidos,
        correo: rows[0].correo,
        rol: rows[0].rol,
        token,
        ok: true,
      });
    } else {
      res.send({
        mensaje: "Correo y/o contraseña invalidos",
        ok: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
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
      return res.send({
        ok: false,
        mensaje: "Correo existente, ingrese otro",
      });

    const [rows] = await pool.query(
      "INSERT INTO usuario" +
        "(nombre, apellidos, contrasena, correo, rol, estado) VALUES (?,?,?,?,?,?)",
      [nombre, apellidos, contrasenaEncriptada, correo, rol, estado]
    );

    const token = await generarJWT(rows.insertId, nombre + " " + apellidos);

    res.send({
      id_usuario: rows.insertId,
      nombre,
      apellidos,
      correo,
      rol,
      token,
      ok: true,
      mensaje: "Usuario registrado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      error,
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

    const { nombre, apellidos, correo, rol } = rows[0];

    const token = await generarJWT(id_usuario, nombre + " " + apellidos);

    res.send({
      id_usuario,
      nombre,
      apellidos,
      correo,
      rol,
      token,
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

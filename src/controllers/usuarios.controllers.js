import { pool } from "../db.js";

export const getUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuario");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: error,
    });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM usuario Where id_usuario = ?",
      [req.params.id_usuario]
    );

    if (result.length <= 0)
      return res.status(404).json({
        mensaje: "No se encontró ningun usuario",
      });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const updateEstadoUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { estado } = req.body;
    const [result] = await pool.query(
      "UPDATE usuario SET estado = ? where id_usuario = ?",
      [estado, id_usuario]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        mensaje: "No se encontró ningun usuario",
      });

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE id_usuario = ?",
      [id_usuario]
    );

    res.send({
      rows: rows[0],
      mensaje: "El estado del usuario se actualizó exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { nombre, apellidos, contrasena, correo, rol, estado } = req.body;
    const [result] = await pool.query(
      "UPDATE usuario SET nombre = ? , apellidos = ? , contrasena = ? ," +
        "correo = ?, rol = ?, estado = ? where id_usuario = ?",
      [nombre, apellidos, contrasena, correo, rol, estado, id_usuario]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        mensaje: "No se encontró ningun usuario",
      });

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE id_usuario = ?",
      [id_usuario]
    );

    res.send({
      rows: rows[0],
      mensaje: "La información del usuario se actualizó exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

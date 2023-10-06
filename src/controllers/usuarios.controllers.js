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

export const reservarConsultaUsuario = async (req, res) => {
  try {
    const { id_usuario, id_consulta } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO consulta_usuario (id_usuario, id_consulta) VALUES (?,?)",
      [id_usuario, id_consulta]
    );

    const [result] = await pool.query(
      "UPDATE consulta SET estado = 0 WHERE id_consulta = ?",
      [id_consulta]
    );

    if (rows.affectedRows === 1 && result.affectedRows === 1) {
      res.send({
        id_consulta_usuario: rows.insertId,
        id_usuario,
        id_consulta,
        ok: true,
        mensaje: "Consulta reservada exitosamente",
      });
    } else {
      res.send({
        ok: false,
        mensaje: "Problemas al reservar la consulta, intentelo más tarde",
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

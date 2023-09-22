import { pool } from "../db.js";

export const getConsultas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * from consulta");
    res.send(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const getConsultasById = async (req, res) => {
  try {
    const { id_consulta } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM consulta WHERE id_consulta = ?",
      [id_consulta]
    );

    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const updateEstadoConsulta = async (req, res) => {
  try {
    const { id_consulta } = req.params;
    const { estado } = req.body;

    const [result] = await pool.query(
      "UPDATE consulta SET estado = ? WHERE id_consulta = ?",
      [estado, id_consulta]
    );

    if (result.affectedRows === 0)
      return res.send({
        mensaje: "Problemas al actualizar la información",
      });

    const [rows] = await pool.query(
      "SELECT * FROM consulta WHERE id_consulta = ?",
      [id_consulta]
    );

    res.send({
      rows: rows[0],
      mensaje: "El estado de la consulta se actualizó exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const createConsulta = async (req, res) => {
  try {
    const { fecha, hora_inicio, hora_fin, estado } = req.body;

    const [result] = await pool.query(
      "INSERT INTO CONSULTA (fecha, hora_inicio, hora_fin, estado) VALUES (?, ?, ?, ?)",
      [fecha, hora_inicio, hora_fin, estado]
    );

    if (result.affectedRows === 1)
      res.send({
        id_consulta: result.insertId,
        fecha,
        hora_inicio,
        hora_fin,
        estado,
      });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

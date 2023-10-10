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

export const getConsultaByIdUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const [rows] = await pool.query(
      "SELECT c.id_consulta, c.fecha, c.hora_inicio, c.hora_fin, c.estado " +
        "FROM CONSULTA_USUARIO cu INNER JOIN USUARIO u on cu.id_usuario = u.id_usuario " +
        "INNER JOIN CONSULTA c on c.id_consulta = cu.id_consulta " +
        "WHERE cu.id_usuario = ?",
      [id_usuario]
    );

    res.send(rows);
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

export const updateConsulta = async (req, res) => {
  try {
    const { id_consulta } = req.params;
    const { fecha, hora_inicio, hora_fin, estado } = req.body;

    const existeConsulta = await existeConsultaRegistrada(
      fecha,
      hora_inicio,
      hora_fin
    );

    const mismaHora = await mismaHoraConsulta(
      id_consulta,
      hora_inicio,
      hora_fin
    );

    if (mismaHora === true) {
      await queryUpdate(fecha, hora_inicio, hora_fin, estado, id_consulta, res);
    } else if (existeConsulta === false) {
      await queryUpdate(fecha, hora_inicio, hora_fin, estado, id_consulta, res);
    } else {
      return res.send({
        ok: false,
        mensaje: "Horario no disponible, ingrese otro hora de inicio y fin",
      });
    }
  } catch (error) {
    return res.status(500).json({
      mensaje: "¡Problemas al procesar la solicitud, intentelo más tarde!",
      ok: false,
    });
  }
};

export const getConsultasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.params;
    const [result] = await pool.query(
      "SELECT * from consulta WHERE fecha = ? ORDER BY hora_inicio",
      fecha
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const getInformacionUsuarioConsulta = async (req, res) => {
  try {
    const { id_consulta } = req.params;
    const [result] = await pool.query(
      "SELECT u.id_usuario, u.nombre, u.apellidos, u.correo , c.id_consulta, c.fecha, c.hora_inicio, c.hora_fin " +
        "FROM USUARIO u  inner join CONSULTA_USUARIO co on u.id_usuario = co.id_usuario " +
        "inner join CONSULTA c on co.id_consulta = c.id_consulta " +
        "where c.id_consulta = ?",
      id_consulta
    );
    res.send(result[0]);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const createConsulta = async (req, res) => {
  try {
    const { fecha, hora_inicio, hora_fin, estado } = req.body;

    let existeConsulta = await existeConsultaRegistrada(
      fecha,
      hora_inicio,
      hora_fin
    );

    if (existeConsulta === true)
      return res.send({
        ok: false,
        mensaje: "Horario no disponible, ingrese otro hora de inicio y fin",
      });

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
        mensaje: "Consulta registrada exitosamente",
        ok: true,
      });
  } catch (error) {
    return res.status(500).json({
      mensaje: "¡Problemas al procesar la solicitud, intentelo más tarde!",
      ok: false,
    });
  }
};

export const queryUpdate = async (
  fecha,
  hora_inicio,
  hora_fin,
  estado,
  id_consulta,
  res
) => {
  const [result] = await pool.query(
    "UPDATE CONSULTA SET fecha = ?, hora_inicio = ?, hora_fin = ?, estado = ? WHERE id_consulta = ?",
    [fecha, hora_inicio, hora_fin, estado, id_consulta]
  );

  if (result.affectedRows === 1)
    res.send({
      id_consulta,
      fecha,
      hora_inicio,
      hora_fin,
      estado,
      mensaje: "Información actualizada exitosamente",
      ok: true,
    });
};
const existeConsultaRegistrada = async (fecha, hora_inicio, hora_fin) => {
  const [rows] = await pool.query(
    "SELECT * FROM consulta WHERE fecha = ? AND hora_inicio = ? AND hora_fin = ?",
    [fecha, hora_inicio, hora_fin]
  );

  if (rows[0]) return true;
  return false;
};

const mismaHoraConsulta = async (id_consulta, hora_i, hora_f) => {
  const [rows] = await pool.query(
    "SELECT * FROM consulta where id_consulta = ?",
    [id_consulta]
  );

  const { hora_inicio, hora_fin } = rows[0];

  if (hora_inicio === hora_i && hora_fin === hora_f) return true;
  return false;
};

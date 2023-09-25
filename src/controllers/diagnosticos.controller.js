import { pool } from "../db.js";

export const getDiagnosticos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * from diagnostico");
    res.send({
      result,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const getDiagnosticoByIdUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM diagnostico WHERE id_usuario = ?",
      [id_usuario]
    );

    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const createDiagnostico = async (req, res) => {
  try {
    const {
      incisivo_central_sup_der_cla,
      incisivo_central_sup_der_gra,
      incisivo_lateral_sup_der_cla,
      incisivo_lateral_sup_der_gra,
      canino_sup_der_cla,
      canino_sup_der_gra,
      primer_premolar_sup_der_cla,
      primer_premolar_sup_der_gra,
      segundo_premolar_sup_der_cla,
      segundo_premolar_sup_der_gra,
      primer_molar_sup_der_cla,
      primer_molar_sup_der_gra,
      segundo_molar_sup_der_cla,
      segundo_molar_sup_der_gra,
      tercer_molar_sup_der_cla,
      tercer_molar_sup_der_gra,
      incisivo_central_sup_izq_cla,
      incisivo_central_sup_izq_gra,
      incisivo_lateral_sup_izq_cla,
      incisivo_lateral_sup_izq_gra,
      canino_sup_izq_cla,
      canino_sup_izq_gra,
      primer_premolar_sup_izq_cla,
      primer_premolar_sup_izq_gra,
      segundo_premolar_sup_izq_cla,
      segundo_premolar_sup_izq_gra,
      primer_molar_sup_izq_cla,
      primer_molar_sup_izq_gra,
      segundo_molar_sup_izq_cla,
      segundo_molar_sup_izq_gra,
      tercer_molar_sup_izq_cla,
      tercer_molar_sup_izq_gra,
      incisivo_central_inf_der_cla,
      incisivo_central_inf_der_gra,
      incisivo_lateral_inf_der_cla,
      incisivo_lateral_inf_der_gra,
      canino_inf_der_cla,
      canino_inf_der_gra,
      primer_premolar_inf_der_cla,
      primer_premolar_inf_der_gra,
      segundo_premolar_inf_der_cla,
      segundo_premolar_inf_der_gra,
      primer_molar_inf_der_cla,
      primer_molar_inf_der_gra,
      segundo_molar_inf_der_cla,
      segundo_molar_inf_der_gra,
      tercer_molar_inf_der_cla,
      tercer_molar_inf_der_gra,
      incisivo_central_inf_izq_cla,
      incisivo_central_inf_izq_gra,
      incisivo_lateral_inf_izq_cla,
      incisivo_lateral_inf_izq_gra,
      canino_inf_izq_cla,
      canino_inf_izq_gra,
      primer_premolar_inf_izq_cla,
      primer_premolar_inf_izq_gra,
      segundo_premolar_inf_izq_cla,
      segundo_premolar_inf_izq_gra,
      primer_molar_inf_izq_cla,
      primer_molar_inf_izq_gra,
      segundo_molar_inf_izq_cla,
      segundo_molar_inf_izq_gra,
      tercer_molar_inf_izq_cla,
      tercer_molar_inf_izq_gra,
      mensaje,
    } = req.body;

    const [result] = await pool.query(
      "insert into diagnostico " +
        "(incisivo_central_sup_der_cla, " +
        "incisivo_central_sup_der_gra,  " +
        "incisivo_lateral_sup_der_cla, " +
        "incisivo_lateral_sup_der_gra, " +
        "canino_sup_der_cla, " +
        "canino_sup_der_gra, " +
        "primer_premolar_sup_der_cla, " +
        "primer_premolar_sup_der_gra, " +
        "segundo_premolar_sup_der_cla, " +
        "segundo_premolar_sup_der_gra, " +
        "primer_molar_sup_der_cla, " +
        "primer_molar_sup_der_gra, " +
        "segundo_molar_sup_der_cla, " +
        "segundo_molar_sup_der_gra, " +
        "tercer_molar_sup_der_cla, " +
        "tercer_molar_sup_der_gra, " +
        "incisivo_central_sup_izq_cla, " +
        "incisivo_central_sup_izq_gra, " +
        "incisivo_lateral_sup_izq_cla, " +
        "incisivo_lateral_sup_izq_gra, " +
        "canino_sup_izq_cla, " +
        "canino_sup_izq_gra, " +
        "primer_premolar_sup_izq_cla, " +
        "primer_premolar_sup_izq_gra, " +
        "segundo_premolar_sup_izq_cla, " +
        "segundo_premolar_sup_izq_gra, " +
        "primer_molar_sup_izq_cla, " +
        "primer_molar_sup_izq_gra, " +
        "segundo_molar_sup_izq_cla, " +
        "segundo_molar_sup_izq_gra, " +
        "tercer_molar_sup_izq_cla, " +
        "tercer_molar_sup_izq_gra, " +
        "incisivo_central_inf_der_cla, " +
        "incisivo_central_inf_der_gra, " +
        "incisivo_lateral_inf_der_cla, " +
        "incisivo_lateral_inf_der_gra, " +
        "canino_inf_der_cla, " +
        "canino_inf_der_gra, " +
        "primer_premolar_inf_der_cla, " +
        "primer_premolar_inf_der_gra, " +
        "segundo_premolar_inf_der_cla, " +
        "segundo_premolar_inf_der_gra, " +
        "primer_molar_inf_der_cla, " +
        "primer_molar_inf_der_gra, " +
        "segundo_molar_inf_der_cla, " +
        "segundo_molar_inf_der_gra, " +
        "tercer_molar_inf_der_cla, " +
        "tercer_molar_inf_der_gra, " +
        "incisivo_central_inf_izq_cla," +
        "incisivo_central_inf_izq_gra," +
        "incisivo_lateral_inf_izq_cla," +
        "incisivo_lateral_inf_izq_gra," +
        "canino_inf_izq_cla," +
        "canino_inf_izq_gra," +
        "primer_premolar_inf_izq_cla, " +
        "primer_premolar_inf_izq_gra, " +
        "segundo_premolar_inf_izq_cla, " +
        "segundo_premolar_inf_izq_gra, " +
        "primer_molar_inf_izq_cla, " +
        "primer_molar_inf_izq_gra, " +
        "segundo_molar_inf_izq_cla, " +
        "segundo_molar_inf_izq_gra, " +
        "tercer_molar_inf_izq_cla, " +
        "tercer_molar_inf_izq_gra, " +
        "mensaje) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
        "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        incisivo_central_sup_der_cla,
        incisivo_central_sup_der_gra,
        incisivo_lateral_sup_der_cla,
        incisivo_lateral_sup_der_gra,
        canino_sup_der_cla,
        canino_sup_der_gra,
        primer_premolar_sup_der_cla,
        primer_premolar_sup_der_gra,
        segundo_premolar_sup_der_cla,
        segundo_premolar_sup_der_gra,
        primer_molar_sup_der_cla,
        primer_molar_sup_der_gra,
        segundo_molar_sup_der_cla,
        segundo_molar_sup_der_gra,
        tercer_molar_sup_der_cla,
        tercer_molar_sup_der_gra,
        incisivo_central_sup_izq_cla,
        incisivo_central_sup_izq_gra,
        incisivo_lateral_sup_izq_cla,
        incisivo_lateral_sup_izq_gra,
        canino_sup_izq_cla,
        canino_sup_izq_gra,
        primer_premolar_sup_izq_cla,
        primer_premolar_sup_izq_gra,
        segundo_premolar_sup_izq_cla,
        segundo_premolar_sup_izq_gra,
        primer_molar_sup_izq_cla,
        primer_molar_sup_izq_gra,
        segundo_molar_sup_izq_cla,
        segundo_molar_sup_izq_gra,
        tercer_molar_sup_izq_cla,
        tercer_molar_sup_izq_gra,
        incisivo_central_inf_der_cla,
        incisivo_central_inf_der_gra,
        incisivo_lateral_inf_der_cla,
        incisivo_lateral_inf_der_gra,
        canino_inf_der_cla,
        canino_inf_der_gra,
        primer_premolar_inf_der_cla,
        primer_premolar_inf_der_gra,
        segundo_premolar_inf_der_cla,
        segundo_premolar_inf_der_gra,
        primer_molar_inf_der_cla,
        primer_molar_inf_der_gra,
        segundo_molar_inf_der_cla,
        segundo_molar_inf_der_gra,
        tercer_molar_inf_der_cla,
        tercer_molar_inf_der_gra,
        incisivo_central_inf_izq_cla,
        incisivo_central_inf_izq_gra,
        incisivo_lateral_inf_izq_cla,
        incisivo_lateral_inf_izq_gra,
        canino_inf_izq_cla,
        canino_inf_izq_gra,
        primer_premolar_inf_izq_cla,
        primer_premolar_inf_izq_gra,
        segundo_premolar_inf_izq_cla,
        segundo_premolar_inf_izq_gra,
        primer_molar_inf_izq_cla,
        primer_molar_inf_izq_gra,
        segundo_molar_inf_izq_cla,
        segundo_molar_inf_izq_gra,
        tercer_molar_inf_izq_cla,
        tercer_molar_inf_izq_gra,
        mensaje,
      ]
    );

    res.json({
      id_diagnostico: result.insertId,
      incisivo_central_sup_der_cla,
      incisivo_central_sup_der_gra,
      incisivo_lateral_sup_der_cla,
      incisivo_lateral_sup_der_gra,
      canino_sup_der_cla,
      canino_sup_der_gra,
      primer_premolar_sup_der_cla,
      primer_premolar_sup_der_gra,
      segundo_premolar_sup_der_cla,
      segundo_premolar_sup_der_gra,
      primer_molar_sup_der_cla,
      primer_molar_sup_der_gra,
      segundo_molar_sup_der_cla,
      segundo_molar_sup_der_gra,
      tercer_molar_sup_der_cla,
      tercer_molar_sup_der_gra,
      incisivo_central_sup_izq_cla,
      incisivo_central_sup_izq_gra,
      incisivo_lateral_sup_izq_cla,
      incisivo_lateral_sup_izq_gra,
      canino_sup_izq_cla,
      canino_sup_izq_gra,
      primer_premolar_sup_izq_cla,
      primer_premolar_sup_izq_gra,
      segundo_premolar_sup_izq_cla,
      segundo_premolar_sup_izq_gra,
      primer_molar_sup_izq_cla,
      primer_molar_sup_izq_gra,
      segundo_molar_sup_izq_cla,
      segundo_molar_sup_izq_gra,
      tercer_molar_sup_izq_cla,
      tercer_molar_sup_izq_gra,
      incisivo_central_inf_der_cla,
      incisivo_central_inf_der_gra,
      incisivo_lateral_inf_der_cla,
      incisivo_lateral_inf_der_gra,
      canino_inf_der_cla,
      canino_inf_der_gra,
      primer_premolar_inf_der_cla,
      primer_premolar_inf_der_gra,
      segundo_premolar_inf_der_cla,
      segundo_premolar_inf_der_gra,
      primer_molar_inf_der_cla,
      primer_molar_inf_der_gra,
      segundo_molar_inf_der_cla,
      segundo_molar_inf_der_gra,
      tercer_molar_inf_der_cla,
      tercer_molar_inf_der_gra,
      incisivo_central_inf_izq_cla,
      incisivo_central_inf_izq_gra,
      incisivo_lateral_inf_izq_cla,
      incisivo_lateral_inf_izq_gra,
      canino_inf_izq_cla,
      canino_inf_izq_gra,
      primer_premolar_inf_izq_cla,
      primer_premolar_inf_izq_gra,
      segundo_premolar_inf_izq_cla,
      segundo_premolar_inf_izq_gra,
      primer_molar_inf_izq_cla,
      primer_molar_inf_izq_gra,
      segundo_molar_inf_izq_cla,
      segundo_molar_inf_izq_gra,
      tercer_molar_inf_izq_cla,
      tercer_molar_inf_izq_gra,
      mensaje,
      mensaje: "El diagnóstico se registro exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const updateDiagnostico = async (req, res) => {
  try {
    const { id_diagnostico } = req.params;
    const {
      incisivo_central_sup_der_cla,
      incisivo_central_sup_der_gra,
      incisivo_lateral_sup_der_cla,
      incisivo_lateral_sup_der_gra,
      canino_sup_der_cla,
      canino_sup_der_gra,
      primer_premolar_sup_der_cla,
      primer_premolar_sup_der_gra,
      segundo_premolar_sup_der_cla,
      segundo_premolar_sup_der_gra,
      primer_molar_sup_der_cla,
      primer_molar_sup_der_gra,
      segundo_molar_sup_der_cla,
      segundo_molar_sup_der_gra,
      tercer_molar_sup_der_cla,
      tercer_molar_sup_der_gra,
      incisivo_central_sup_izq_cla,
      incisivo_central_sup_izq_gra,
      incisivo_lateral_sup_izq_cla,
      incisivo_lateral_sup_izq_gra,
      canino_sup_izq_cla,
      canino_sup_izq_gra,
      primer_premolar_sup_izq_cla,
      primer_premolar_sup_izq_gra,
      segundo_premolar_sup_izq_cla,
      segundo_premolar_sup_izq_gra,
      primer_molar_sup_izq_cla,
      primer_molar_sup_izq_gra,
      segundo_molar_sup_izq_cla,
      segundo_molar_sup_izq_gra,
      tercer_molar_sup_izq_cla,
      tercer_molar_sup_izq_gra,
      incisivo_central_inf_der_cla,
      incisivo_central_inf_der_gra,
      incisivo_lateral_inf_der_cla,
      incisivo_lateral_inf_der_gra,
      canino_inf_der_cla,
      canino_inf_der_gra,
      primer_premolar_inf_der_cla,
      primer_premolar_inf_der_gra,
      segundo_premolar_inf_der_cla,
      segundo_premolar_inf_der_gra,
      primer_molar_inf_der_cla,
      primer_molar_inf_der_gra,
      segundo_molar_inf_der_cla,
      segundo_molar_inf_der_gra,
      tercer_molar_inf_der_cla,
      tercer_molar_inf_der_gra,
      incisivo_central_inf_izq_cla,
      incisivo_central_inf_izq_gra,
      incisivo_lateral_inf_izq_cla,
      incisivo_lateral_inf_izq_gra,
      canino_inf_izq_cla,
      canino_inf_izq_gra,
      primer_premolar_inf_izq_cla,
      primer_premolar_inf_izq_gra,
      segundo_premolar_inf_izq_cla,
      segundo_premolar_inf_izq_gra,
      primer_molar_inf_izq_cla,
      primer_molar_inf_izq_gra,
      segundo_molar_inf_izq_cla,
      segundo_molar_inf_izq_gra,
      tercer_molar_inf_izq_cla,
      tercer_molar_inf_izq_gra,
      mensaje,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE diagnostico " +
        "SET incisivo_central_sup_der_cla = ? ," +
        "incisivo_central_sup_der_gra = ?,  " +
        "incisivo_lateral_sup_der_cla = ?, " +
        "incisivo_lateral_sup_der_gra = ?, " +
        "canino_sup_der_cla = ?, " +
        "canino_sup_der_gra = ?, " +
        "primer_premolar_sup_der_cla = ?, " +
        "primer_premolar_sup_der_gra = ?, " +
        "segundo_premolar_sup_der_cla = ?, " +
        "segundo_premolar_sup_der_gra = ?, " +
        "primer_molar_sup_der_cla = ?, " +
        "primer_molar_sup_der_gra = ?, " +
        "segundo_molar_sup_der_cla = ?, " +
        "segundo_molar_sup_der_gra = ?, " +
        "tercer_molar_sup_der_cla = ?, " +
        "tercer_molar_sup_der_gra = ?, " +
        "incisivo_central_sup_izq_cla = ?, " +
        "incisivo_central_sup_izq_gra = ?, " +
        "incisivo_lateral_sup_izq_cla = ?, " +
        "incisivo_lateral_sup_izq_gra = ?, " +
        "canino_sup_izq_cla = ?, " +
        "canino_sup_izq_gra = ?, " +
        "primer_premolar_sup_izq_cla = ?, " +
        "primer_premolar_sup_izq_gra = ?, " +
        "segundo_premolar_sup_izq_cla = ?, " +
        "segundo_premolar_sup_izq_gra = ?, " +
        "primer_molar_sup_izq_cla = ?, " +
        "primer_molar_sup_izq_gra = ?, " +
        "segundo_molar_sup_izq_cla = ?, " +
        "segundo_molar_sup_izq_gra = ?, " +
        "tercer_molar_sup_izq_cla = ?, " +
        "tercer_molar_sup_izq_gra = ?, " +
        "incisivo_central_inf_der_cla = ?, " +
        "incisivo_central_inf_der_gra = ?, " +
        "incisivo_lateral_inf_der_cla = ?, " +
        "incisivo_lateral_inf_der_gra = ?, " +
        "canino_inf_der_cla = ?, " +
        "canino_inf_der_gra = ?, " +
        "primer_premolar_inf_der_cla = ?, " +
        "primer_premolar_inf_der_gra = ?, " +
        "segundo_premolar_inf_der_cla = ?, " +
        "segundo_premolar_inf_der_gra = ?, " +
        "primer_molar_inf_der_cla = ?, " +
        "primer_molar_inf_der_gra = ?, " +
        "segundo_molar_inf_der_cla = ?, " +
        "segundo_molar_inf_der_gra = ?, " +
        "tercer_molar_inf_der_cla = ?, " +
        "tercer_molar_inf_der_gra = ?, " +
        "incisivo_central_inf_izq_cla = ?," +
        "incisivo_central_inf_izq_gra = ?," +
        "incisivo_lateral_inf_izq_cla = ?," +
        "incisivo_lateral_inf_izq_gra = ?," +
        "canino_inf_izq_cla = ?," +
        "canino_inf_izq_gra = ?," +
        "primer_premolar_inf_izq_cla = ?, " +
        "primer_premolar_inf_izq_gra = ?, " +
        "segundo_premolar_inf_izq_cla = ?, " +
        "segundo_premolar_inf_izq_gra = ?, " +
        "primer_molar_inf_izq_cla = ?, " +
        "primer_molar_inf_izq_gra = ?, " +
        "segundo_molar_inf_izq_cla = ?, " +
        "segundo_molar_inf_izq_gra = ?, " +
        "tercer_molar_inf_izq_cla = ?, " +
        "tercer_molar_inf_izq_gra = ?, " +
        "mensaje = ? WHERE id_diagnostico = ?",
      [
        incisivo_central_sup_der_cla,
        incisivo_central_sup_der_gra,
        incisivo_lateral_sup_der_cla,
        incisivo_lateral_sup_der_gra,
        canino_sup_der_cla,
        canino_sup_der_gra,
        primer_premolar_sup_der_cla,
        primer_premolar_sup_der_gra,
        segundo_premolar_sup_der_cla,
        segundo_premolar_sup_der_gra,
        primer_molar_sup_der_cla,
        primer_molar_sup_der_gra,
        segundo_molar_sup_der_cla,
        segundo_molar_sup_der_gra,
        tercer_molar_sup_der_cla,
        tercer_molar_sup_der_gra,
        incisivo_central_sup_izq_cla,
        incisivo_central_sup_izq_gra,
        incisivo_lateral_sup_izq_cla,
        incisivo_lateral_sup_izq_gra,
        canino_sup_izq_cla,
        canino_sup_izq_gra,
        primer_premolar_sup_izq_cla,
        primer_premolar_sup_izq_gra,
        segundo_premolar_sup_izq_cla,
        segundo_premolar_sup_izq_gra,
        primer_molar_sup_izq_cla,
        primer_molar_sup_izq_gra,
        segundo_molar_sup_izq_cla,
        segundo_molar_sup_izq_gra,
        tercer_molar_sup_izq_cla,
        tercer_molar_sup_izq_gra,
        incisivo_central_inf_der_cla,
        incisivo_central_inf_der_gra,
        incisivo_lateral_inf_der_cla,
        incisivo_lateral_inf_der_gra,
        canino_inf_der_cla,
        canino_inf_der_gra,
        primer_premolar_inf_der_cla,
        primer_premolar_inf_der_gra,
        segundo_premolar_inf_der_cla,
        segundo_premolar_inf_der_gra,
        primer_molar_inf_der_cla,
        primer_molar_inf_der_gra,
        segundo_molar_inf_der_cla,
        segundo_molar_inf_der_gra,
        tercer_molar_inf_der_cla,
        tercer_molar_inf_der_gra,
        incisivo_central_inf_izq_cla,
        incisivo_central_inf_izq_gra,
        incisivo_lateral_inf_izq_cla,
        incisivo_lateral_inf_izq_gra,
        canino_inf_izq_cla,
        canino_inf_izq_gra,
        primer_premolar_inf_izq_cla,
        primer_premolar_inf_izq_gra,
        segundo_premolar_inf_izq_cla,
        segundo_premolar_inf_izq_gra,
        primer_molar_inf_izq_cla,
        primer_molar_inf_izq_gra,
        segundo_molar_inf_izq_cla,
        segundo_molar_inf_izq_gra,
        tercer_molar_inf_izq_cla,
        tercer_molar_inf_izq_gra,
        mensaje,
        id_diagnostico,
      ]
    );

    res.json({
      id_diagnostico: result.insertId,
      incisivo_central_sup_der_cla,
      incisivo_central_sup_der_gra,
      incisivo_lateral_sup_der_cla,
      incisivo_lateral_sup_der_gra,
      canino_sup_der_cla,
      canino_sup_der_gra,
      primer_premolar_sup_der_cla,
      primer_premolar_sup_der_gra,
      segundo_premolar_sup_der_cla,
      segundo_premolar_sup_der_gra,
      primer_molar_sup_der_cla,
      primer_molar_sup_der_gra,
      segundo_molar_sup_der_cla,
      segundo_molar_sup_der_gra,
      tercer_molar_sup_der_cla,
      tercer_molar_sup_der_gra,
      incisivo_central_sup_izq_cla,
      incisivo_central_sup_izq_gra,
      incisivo_lateral_sup_izq_cla,
      incisivo_lateral_sup_izq_gra,
      canino_sup_izq_cla,
      canino_sup_izq_gra,
      primer_premolar_sup_izq_cla,
      primer_premolar_sup_izq_gra,
      segundo_premolar_sup_izq_cla,
      segundo_premolar_sup_izq_gra,
      primer_molar_sup_izq_cla,
      primer_molar_sup_izq_gra,
      segundo_molar_sup_izq_cla,
      segundo_molar_sup_izq_gra,
      tercer_molar_sup_izq_cla,
      tercer_molar_sup_izq_gra,
      incisivo_central_inf_der_cla,
      incisivo_central_inf_der_gra,
      incisivo_lateral_inf_der_cla,
      incisivo_lateral_inf_der_gra,
      canino_inf_der_cla,
      canino_inf_der_gra,
      primer_premolar_inf_der_cla,
      primer_premolar_inf_der_gra,
      segundo_premolar_inf_der_cla,
      segundo_premolar_inf_der_gra,
      primer_molar_inf_der_cla,
      primer_molar_inf_der_gra,
      segundo_molar_inf_der_cla,
      segundo_molar_inf_der_gra,
      tercer_molar_inf_der_cla,
      tercer_molar_inf_der_gra,
      incisivo_central_inf_izq_cla,
      incisivo_central_inf_izq_gra,
      incisivo_lateral_inf_izq_cla,
      incisivo_lateral_inf_izq_gra,
      canino_inf_izq_cla,
      canino_inf_izq_gra,
      primer_premolar_inf_izq_cla,
      primer_premolar_inf_izq_gra,
      segundo_premolar_inf_izq_cla,
      segundo_premolar_inf_izq_gra,
      primer_molar_inf_izq_cla,
      primer_molar_inf_izq_gra,
      segundo_molar_inf_izq_cla,
      segundo_molar_inf_izq_gra,
      tercer_molar_inf_izq_cla,
      tercer_molar_inf_izq_gra,
      mensaje,
      id_diagnostico,
      mensaje: "La información se actualizo exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

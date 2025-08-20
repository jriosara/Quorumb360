// models/Reuniones.js
const pool = require('../config/database');

const Reunion = {
  async crear(titulo, fecha_inicio, fecha_fin) {
    const [result] = await pool.query(
      'INSERT INTO reuniones (titulo, fecha_inicio, fecha_fin) VALUES (?, ?, ?)',
      [titulo, fecha_inicio, fecha_fin]
    );
    return result.insertId;
  },

  async obtenerTodas() {
    const [rows] = await pool.query('SELECT * FROM reuniones');
    return rows;
  },

  async obtenerPorId(id) {
    const [rows] = await pool.query('SELECT * FROM reuniones WHERE id = ?', [id]);
    return rows[0];
  },

  async actualizar(id, titulo, fecha_inicio, fecha_fin) {
    const [result] = await pool.query(
      'UPDATE reuniones SET titulo = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?',
      [titulo, fecha_inicio, fecha_fin, id]
    );
    return result.affectedRows > 0;
  },

  async eliminar(id) {
    const [result] = await pool.query('DELETE FROM reuniones WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Reunion;


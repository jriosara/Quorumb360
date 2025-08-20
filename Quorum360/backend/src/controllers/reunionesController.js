// controllers/reunionesController.js
const { pool } = require('../config/database');

const obtenerReuniones = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reuniones');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener reuniones:', error);
    res.status(500).json({ error: 'Error al obtener reuniones' });
  }
};

const crearReunion = async (req, res) => {
  try {
    const { titulo, fecha_inicio, fecha_fin } = req.body;

    const [result] = await pool.query(
      'INSERT INTO reuniones (titulo, fecha_inicio, fecha_fin) VALUES (?, ?, ?)',
      [titulo, fecha_inicio, fecha_fin]
    );

    res.status(201).json({
      message: 'Reunión creada exitosamente',
      reunion: {
        id: result.insertId,
        titulo,
        fecha_inicio,
        fecha_fin
      }
    });
  } catch (error) {
    console.error('Error al crear reunión:', error);
    res.status(500).json({ error: 'Error al crear reunión' });
  }
};

module.exports = {
  obtenerReuniones,
  crearReunion
};


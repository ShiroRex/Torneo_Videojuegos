const pool = require('../config/db');

// RF03 y RF05: Registrar puntuación
exports.crearPuntuacion = async (req, res) => {
  const { jugador_id, videojuego_id, puntuacion } = req.body;

  if (jugador_id === undefined || videojuego_id === undefined || puntuacion === undefined) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const scoreNum = Number(puntuacion);
  if (isNaN(scoreNum) || scoreNum < 0) {
    return res.status(400).json({ error: 'La puntuación no puede ser negativa' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO puntuaciones (jugador_id, videojuego_id, puntuacion) VALUES (?, ?, ?)',
      [jugador_id, videojuego_id, scoreNum]
    );
    res.status(201).json({ mensaje: 'Puntuación registrada exitosamente', id: result.insertId });
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'El jugador o el videojuego no existen' });
    }
    res.status(500).json({ error: 'Error al registrar puntuación' });
  }
};
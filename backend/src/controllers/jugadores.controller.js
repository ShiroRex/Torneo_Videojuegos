const pool = require('../config/db');

// RF01: Registrar jugador
exports.crearJugador = async (req, res) => {
  const { nombre, gamertag, correo } = req.body;

  // Validación de campos vacíos
  if (!nombre || !gamertag || !correo) {
    return res.status(400).json({ error: 'Nombre, Gamertag y correo son obligatorios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO jugadores (nombre, gamertag, correo) VALUES (?, ?, ?)',
      [nombre.trim(), gamertag.trim(), correo.trim()]
    );

    return res.status(201).json({
      mensaje: 'Jugador registrado exitosamente',
      id: result.insertId
    });
  } catch (error) {
    // Control de gamertag duplicado (evaluación de la rúbrica)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        error: 'El Gamertag ya se encuentra registrado'
      });
    }

    console.error('Error en crearJugador:', error);
    return res.status(500).json({ error: 'Error interno al registrar jugador' });
  }
};

// RF04: Listar todos los jugadores
exports.obtenerJugadores = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, gamertag, correo, DATE_FORMAT(fecha_registro, "%Y-%m-%d %H:%i") AS fecha_registro FROM jugadores ORDER BY id DESC'
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error en obtenerJugadores:', error);
    return res.status(500).json({ error: 'Error interno al obtener jugadores' });
  }
};

// RF07: Buscar jugadores por nombre o gamertag
exports.buscarJugadores = async (req, res) => {
  const { q } = req.query;

  if (!q || !q.trim()) {
    return res.status(400).json({ error: 'Debes proporcionar un término de búsqueda en ?q=' });
  }

  try {
    const busqueda = `%${q.trim()}%`;
    const [rows] = await pool.query(
      'SELECT id, nombre, gamertag, correo, DATE_FORMAT(fecha_registro, "%Y-%m-%d %H:%i") AS fecha_registro FROM jugadores WHERE nombre LIKE ? OR gamertag LIKE ? ORDER BY id DESC',
      [busqueda, busqueda]
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error en buscarJugadores:', error);
    return res.status(500).json({ error: 'Error interno al buscar jugadores' });
  }
};
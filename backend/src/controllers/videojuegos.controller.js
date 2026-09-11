const pool = require('../config/db');

exports.crearVideojuego = async (req, res) => {
  const { nombre, genero } = req.body;

  if (!nombre || !genero) {
    return res.status(400).json({ error: 'Nombre y género son obligatorios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO videojuegos (nombre, genero) VALUES (?, ?)',
      [nombre.trim(), genero.trim()]
    );
    res.status(201).json({ mensaje: 'Videojuego registrado exitosamente', id: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'El videojuego ya se encuentra registrado' });
    }
    res.status(500).json({ error: 'Error al registrar videojuego' });
  }
};

exports.obtenerVideojuegos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, genero FROM videojuegos ORDER BY nombre ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener videojuegos' });
  }
};
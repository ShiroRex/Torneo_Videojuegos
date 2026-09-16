const pool = require('../config/db');

// RF06: Ranking ordenado descendentemente
exports.obtenerRanking = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        j.gamertag AS jugador, 
        v.nombre AS videojuego, 
        p.puntuacion,
        DATE_FORMAT(p.fecha, "%Y-%m-%d %H:%i") AS fecha
      FROM puntuaciones p
      INNER JOIN jugadores j ON p.jugador_id = j.id
      INNER JOIN videojuegos v ON p.videojuego_id = v.id
      ORDER BY p.puntuacion DESC
    `);

    const ranking = rows.map((item, index) => ({
      posicion: index + 1,
      ...item
    }));

    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ranking' });
  }
};

// RF08: Estadísticas agregadas
exports.obtenerEstadisticas = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM jugadores) AS total_jugadores,
        (SELECT COUNT(*) FROM videojuegos) AS total_videojuegos,
        (SELECT COUNT(*) FROM puntuaciones) AS total_puntuaciones,
        IFNULL((SELECT ROUND(AVG(puntuacion), 2) FROM puntuaciones), 0) AS puntuacion_promedio
    `);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular estadísticas' });
  }
};
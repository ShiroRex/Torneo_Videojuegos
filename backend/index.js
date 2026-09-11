require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('conexion con sql exitoso');
    conn.release();

    app.listen(PORT, () => {
      console.log(` Servido en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Error de conexión a la bd:', error.message);
    process.exit(1);
  }
})();
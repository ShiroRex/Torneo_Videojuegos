const { Router } = require('express');
const router = Router();

// Rutas individuales
router.use('/jugadores', require('./jugadores.routes'));

// router.use('/videojuegos', require('./videojuegos.routes'));
// router.use('/puntuaciones', require('./puntuaciones.routes'));
// router.use('/', require('./dashboard.routes'));

module.exports = router;
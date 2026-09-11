const { Router } = require('express');
const router = Router();
const controller = require('../controllers/jugadores.controller');

router.post('/', controller.crearJugador);
router.get('/', controller.obtenerJugadores);
router.get('/buscar', controller.buscarJugadores);

module.exports = router;
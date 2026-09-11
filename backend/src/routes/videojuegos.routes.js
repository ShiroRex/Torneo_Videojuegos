const { Router } = require('express');
const router = Router();
const controller = require('../controllers/videojuegos.controller');

router.post('/', controller.crearVideojuego);
router.get('/', controller.obtenerVideojuegos);

module.exports = router;
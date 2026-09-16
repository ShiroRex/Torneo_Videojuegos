const { Router } = require('express');
const router = Router();
const controller = require('../controllers/puntuaciones.controller');

router.post('/', controller.crearPuntuacion);

module.exports = router;
const { Router } = require('express');
const router = Router();
const controller = require('../controllers/dashboard.controller');

router.get('/ranking', controller.obtenerRanking);
router.get('/estadisticas', controller.obtenerEstadisticas);

module.exports = router;
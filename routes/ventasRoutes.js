const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.get('/', ventasController.listAll);
router.post('/', ventasController.createSale);
router.delete('/:id', ventasController.desactivar);
router.get('/filtrarFechas', ventasController.listByDate);

module.exports = router
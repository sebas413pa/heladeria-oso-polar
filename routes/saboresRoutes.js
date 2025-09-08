const express = require('express');
const router = express.Router();
const saboresController = require('../controllers/saboresController');

router.get('/', saboresController.listar);
router.post('/', saboresController.crear);
router.put('/:id_sabor', saboresController.actualizar);
router.delete('/:id_sabor', saboresController.desactivar);

module.exports = router;
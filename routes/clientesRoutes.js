const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.get('/', clientesController.listar);
router.post('/', clientesController.crear);
router.put('/:id_cliente', clientesController.actualizar);
router.delete('/:id_cliente', clientesController.desactivar);

module.exports = router;

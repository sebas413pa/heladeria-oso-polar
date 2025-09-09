const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.listAll);
router.get('/:id', productosController.getProductById);
router.post('/', productosController.createProduct);
router.put('/:id', productosController.updateProduct);
router.delete('/:id', productosController.desactivar);

module.exports = router;

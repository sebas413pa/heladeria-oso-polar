const express = require('express');
const router = express.Router();

const saboresRoutes = require('./saboresRoutes');
const ventasRoutes = require('./ventasRoutes');
const productosRoutes = require('./productosRoutes');

router.use('/sabores', saboresRoutes);
router.use('/ventas', ventasRoutes);
router.use('/productos', productosRoutes);


router.get('/', (req, res) => {
  res.send('API CORRIENDO');
});


module.exports = router;
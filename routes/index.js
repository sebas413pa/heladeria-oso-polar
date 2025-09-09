const express = require('express');
const router = express.Router();

const saboresRoutes = require('./saboresRoutes');
const ventasRoutes = require('./ventasRoutes');

router.use('/sabores', saboresRoutes);
router.use('/ventas', ventasRoutes);



router.get('/', (req, res) => {
  res.send('API CORRIENDO');
});


module.exports = router;
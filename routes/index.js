const express = require('express');
const router = express.Router();

// Importar las rutas de cada módulo
// const usersRoutes = require('./users');

// Usar las rutas
// router.use('/users', usersRoutes);

// Ruta raíz
router.get('/', (req, res) => {
  res.send('API is running');
});
// Exportar el router
// agrego mas cosas 

router.get('/health', (req, res) => {
  res.send('OK');
});

router.get('/status', (req, res) => {
  res.json({ status: 'API is running', uptime: process.uptime() });
});



// fin
// mas lineas
// completarnndo las 20 
//
// 
// Lineas 

//Se importan los controllers
//Ej: const productosController = require('../controllers/productosController')
module.exports = (app) => {
  //rutas

  //Ej: // router.get('/verAutomoviles', automovilesController.list)
  app.use('/', router)
};
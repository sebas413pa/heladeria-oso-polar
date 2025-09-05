const express = require('express');
require('dotenv').config();

const routes = require('./routes'); 

const app = express();
app.use(express.json());


app.use('/api', routes);


app.get('/', (req, res) => {
  res.json({ message: 'Servidor corriendo' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
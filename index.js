const express = require('express');
const conectarDB = require('./config/db')
const app = express();

// Conectar base de datos
conectarDB();

/// Habilitar express.json 
app.use(express.json({ extended: true }));

// Importar rutas
app.use('/historial', require('./routes/interconexion.route'));

// Puerto de la App 
const PORT = process.env.PORT || 4000; 

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})
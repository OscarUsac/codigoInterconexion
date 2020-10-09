// Rutas para codigo de interconexion

const express = require('express');
const router = express.Router();
const interconexionCotroller = require('../controllers/interconexion.controler'); 

// Crea un codigo de interconexion 
// historial/interconexion 

router.post('/interconexion',
    interconexionCotroller.crearCodigoInterconexion
);

router.get('/interconexion/:id',
    interconexionCotroller.verificarCondigoInterconexion
);

module.exports = router; 
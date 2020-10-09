
const Interconexion = require('../models/interconexion.model');
require('dotenv').config({ path: 'variables.env' });
require('datejs');

// funcióm que nos sirve para generar un nuevo código de interconexión 

exports.crearCodigoInterconexion = async (req, res) => {
    try {
        // obtenemos el último documento insertado en la BD 
        const codigo = await Interconexion.findOne({}, {}, { sort: { '_id': -1 } });

        if (codigo) {
            // Extraemos únicamente la parte del correlativo numérico.
            const ultimoCorrelativo = parseInt(codigo.intx_code.split("-")[1]);
            const anioActual = (new Date).getFullYear();
            // Creamos el nuevo código, sumándole uno al correlativo, y añadiento año actual
            const nuevoCodigo = `INTX-${ultimoCorrelativo + 1}-${anioActual}`;
            // Generamos tiempo de expiración 
            var expiracion = new Date().addSeconds(process.env.EXPIRATION_SECONDS);
            // Creamos el nuevo documento
            const insertCodigo = new Interconexion({
                intx_code: nuevoCodigo,
                exp_time: expiracion
            });
            // Guardomos el nuevo documento en la BD
            const registroMongo = await insertCodigo.save();

            const registroCompleto = {
                valid: true,
                msg: "201 - Nueva interconeccion creada",
                data: registroMongo
            }

            // Respondemos con el json estandar
            res.status(200).json(registroCompleto);
        }
        else {
            const registroCompleto = {
                valid: false,
                msg: "No se puedo generar el codigo de interconexion",
                data: {}
            }
            res.status(400).send(registroCompleto);
        }
    } catch (error) {
        const registroCompleto = {
            valid: false,
            msg: "Error al intentar crear el codigo de interconexion",
            data: {}
        }
        res.status(400).send(registroCompleto);
    }
}

// funcióm que nos sirve para verificar si un codigo de interconexión es válido
exports.verificarCondigoInterconexion = async (req, res) => {
    try {
        // Buscamos si e)xiste un código de interconexión con el que recibimos en el request
        const registro = await Interconexion.findOne({ intx_code: req.params.id });
        if (registro) {
            if (Date.parse(registro.exp_time).compareTo(new Date) > 0) {
                // En caso que exista respondemos correctamente.
                return res.status(200).send({
                    "valid": true,
                    "msg": "200 Interconexión válida",
                    "data": {
                    }
                })
            }
        }
        return res.status(400).send({
            "valid": false,
            "msg": "Código de interconexión no válido",
            "data": {}
        })

    } catch (error) {
        return res.status(400).send({
            "valid": false,
            "msg": "Error al intentar verificar el código de interconexión",
            "data": {}
        })
    }
}
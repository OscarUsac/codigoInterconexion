
const Interconexion = require('../models/interconexion.model');

exports.crearCodigoInterconexion = async (req, res) => {
    try {
        const codigo = await Interconexion.findOne({}, {}, { sort: { '_id': -1 } });
        if (codigo) {
            const ultimoCorrelativo = parseInt(codigo.intx_code.split("-")[1]);
            var anioActual = (new Date).getFullYear();
            const nuevoCodigo = `INTX-${ultimoCorrelativo + 1}-${anioActual}`;
            const insertCodigo = new Interconexion({
                intx_code: nuevoCodigo
            });
            const registroMongo = await insertCodigo.save();

            const registroCompleto = {
                valid: true,
                msg: "201 - Nueva interconeccion creada",
                data: registroMongo
            }
            res.status(200).send(registroCompleto);
        }
        else{
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

exports.verificarCondigoInterconexion = async (req, res) => {
    try {
        const registro = await Interconexion.findOne({ intx_code: req.params.id });
        if (registro) {
            res.status(200).send({
                "valid": true,
                "msg": "200 Interconexión válida",
                "data": {
                } 
            })
        }
        else{
            res.status(400).send({
                "valid": false,
                "msg": "Código de interconexión no válido",
                "data": {} 
            })
        }
    } catch (error) {
        res.status(400).send({
            "valid": false,
            "msg": "Error al intentar verificar el código de interconexión",
            "data": {} 
        })
    }
}
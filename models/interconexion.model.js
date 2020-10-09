const mongoose = require('mongoose');
const { Schema } = mongoose;

const Interconexion = new Schema({
    intx_code: { type: String, required: true },
});

module.exports = mongoose.model('Interconexion', Interconexion, 'codigo'); 
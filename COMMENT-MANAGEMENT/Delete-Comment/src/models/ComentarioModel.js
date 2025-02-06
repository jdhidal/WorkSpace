const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    comentario: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comentario', ComentarioSchema);

const Comentario = require('../models/CommentsModel');

class ComentarioService {
    async crearComentario(datos) {
        return await Comentario.create(datos);
    }

    async obtenerComentarios() {
        return await Comentario.find();
    }

    async obtenerComentarioPorId(id) {
        return await Comentario.findById(id);
    }

    async eliminarComentario(id) {
        return await Comentario.findByIdAndDelete(id);
    }
}

module.exports = new ComentarioService();

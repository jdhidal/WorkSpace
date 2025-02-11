const Comentario = require('../models/ComentarioModel');

class CommentsService {
    async eliminarComentario(id) {
        const resultado = await Comentario.findByIdAndDelete(id);
        if (!resultado) throw new Error("Comentario no encontrado");
        return { mensaje: "Comentario eliminado con éxito" };
    }
}

module.exports = new CommentsService();

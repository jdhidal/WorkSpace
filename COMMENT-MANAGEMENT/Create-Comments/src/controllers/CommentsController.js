const comentarioService = require('../services/CommentsService');

class ComentarioController {
    async crearComentario(req, res) {
        try {
            const nuevoComentario = await comentarioService.crearComentario(req.body);
            res.status(201).json(nuevoComentario);
        } catch (error) {
            res.status(500).json({ message: 'Error al guardar el comentario', error });
        }
    }

    async obtenerComentarios(req, res) {
        try {
            const comentarios = await comentarioService.obtenerComentarios();
            res.json(comentarios);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener comentarios', error });
        }
    }

    async obtenerComentarioPorId(req, res) {
        try {
            const comentario = await comentarioService.obtenerComentarioPorId(req.params.id);
            if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado' });
            res.json(comentario);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el comentario', error });
        }
    }

    async eliminarComentario(req, res) {
        try {
            await comentarioService.eliminarComentario(req.params.id);
            res.json({ message: 'Comentario eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el comentario', error });
        }
    }
}

module.exports = new ComentarioController();

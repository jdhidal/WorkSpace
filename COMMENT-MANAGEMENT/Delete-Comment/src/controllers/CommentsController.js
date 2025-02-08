const CommentsService = require('../services/CommentsService');

class CommentsController {
    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await CommentsService.eliminarComentario(id);
            res.json(resultado);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new CommentsController();

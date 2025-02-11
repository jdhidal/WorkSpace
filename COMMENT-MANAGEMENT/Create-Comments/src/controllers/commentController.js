const commentService = require("../services/commentService");

class CommentController {
    async createComment(req, res) {
        try {
            const { name, comment } = req.body;
            if (!name || !comment) {
                return res.status(400).json({ message: "Nombre y comentario requeridos" });
            }
            const newComment = await commentService.createComment({ name, comment });
            return res.status(201).json(newComment);
        } catch (error) {
            return res.status(500).json({ message: "Error al crear comentario", error: error.message });
        }
    }
}

module.exports = new CommentController();

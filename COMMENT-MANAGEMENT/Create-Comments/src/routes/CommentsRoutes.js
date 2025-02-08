const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/CommentsController');

router.post('/', comentarioController.crearComentario);
router.get('/', comentarioController.obtenerComentarios);
router.get('/:id', comentarioController.obtenerComentarioPorId);
router.delete('/:id', comentarioController.eliminarComentario);

module.exports = router;

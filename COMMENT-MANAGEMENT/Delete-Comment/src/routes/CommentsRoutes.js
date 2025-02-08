const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/CommentsController');

// Ruta para eliminar un comentario
router.delete('/:id', CommentsController.eliminar);

module.exports = router;

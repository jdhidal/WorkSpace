const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/CommentsController');

router.delete('/:id', CommentsController.eliminar);

module.exports = router;

// src/routes/commentRoutes.js
const express = require("express");
const { getComments } = require("../controllers/commentController");  // Asegúrate de que esta función esté correctamente importada
const router = express.Router();

// Ruta para obtener los comentarios
router.get("/", getComments);  // Esto es equivalente a '/list-comments'

module.exports = router;

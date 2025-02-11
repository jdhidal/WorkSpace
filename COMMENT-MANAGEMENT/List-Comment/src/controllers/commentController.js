// src/controllers/commentController.js
// src/controllers/commentController.js
const Comment = require("../models/commentModel"); // Actualiza la ruta para que coincida con la ubicación correcta


// Función para obtener todos los comentarios
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find(); // Obtienes todos los comentarios de la base de datos
        res.status(200).json(comments); // Respondes con los comentarios
    } catch (error) {
        console.error("Error getting comments:", error);
        res.status(500).json({ message: "Error fetching comments" }); // Manejo de errores
    }
};

module.exports = { getComments }; // Exportas la función

// services/commentsService.js
const Comment = require("../models/commentModel");

const getAllComments = async () => {
    try {
        const comments = await Comment.find();
        return comments;
    } catch (error) {
        throw new Error("Error al obtener los comentarios: " + error.message);
    }
};

module.exports = { getAllComments };

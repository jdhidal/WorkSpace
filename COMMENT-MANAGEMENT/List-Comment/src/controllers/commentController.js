const Comment = require("../models/commentModel"); 


const getComments = async (req, res) => {
    try {
        const comments = await Comment.find(); 
        res.status(200).json(comments); 
    } catch (error) {
        console.error("Error getting comments:", error);
        res.status(500).json({ message: "Error fetching comments" });
    }
};

module.exports = { getComments }

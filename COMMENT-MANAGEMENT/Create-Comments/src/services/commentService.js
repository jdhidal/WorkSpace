const Comment = require("../models/Comment");

class CommentService {
    async createComment(data) {
        return await Comment.create(data);
    }
}

module.exports = new CommentService();

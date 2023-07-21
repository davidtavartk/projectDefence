const Comment = require('../models/comment');
const User = require('../models/user');
const { sequelize } = require('../configs');

const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.create({
            content: req.body.content,
            user_id: req.body.user_id,
            item_id: id
        })

        res.status(200).json({});
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
}

const getItemComments = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comment.findAll({
            where: { item_id: id },
            attributes: ['id', 'content', 'user_id', 'created_at'],
            include: { model: User, attributes: ['username'] },
            order: [['created_at', 'DESC']],
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error getting comments:', error);
        res.status(500).json({ error: 'Failed to get comments' });
    }
}

module.exports = { addComment, getItemComments };
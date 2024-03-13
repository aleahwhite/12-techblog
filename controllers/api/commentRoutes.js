const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create new comment
router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const newComment = await Comment.create({
                commentText: req.body.commentText,
                postId: req.body.postId,
                userId: req.session.userId,
            });
            res.status(200).json(newComment);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

// update existing comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });
        if (!commentData[0]) {
            return res.status(404).json({ message: 'No comment found with this id or its not your comment to edit!' });
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete existing comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });
        if (!commentData) {
            return res.status(404).json({ message: 'No comment was found with this id, or this is not your comment to delete' });
        }
        res.status(200).json({ message: 'Comment was deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
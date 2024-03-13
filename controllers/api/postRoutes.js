const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new post 
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update existing post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });
        if (!postData[0]) {
            return res.status(404).json({ message: 'No post was found with this id, or it is not your post to update.' });
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete existing post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });
        if (!postData) {
            return res.status(404).json({ message: 'No post was found with this id, or it is not your post to delete.' });
        }
        res.status(200).json({ message: 'Post was deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
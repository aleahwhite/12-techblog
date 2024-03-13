const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// homepage with posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'commentText', 'postId', 'userId', 'createdAt'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/');
    }
    res.render('login');
});


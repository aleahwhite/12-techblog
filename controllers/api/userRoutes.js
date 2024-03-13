const router = require('express');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');

// user sign up
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// user login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            return res.status(400).json({ message: 'Incorrect email or password, try again!' });
        }
        const validPassword = await bcrypt.compare(req.body.password, userData.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect email or password, try again!' });
        }
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
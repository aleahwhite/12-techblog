const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).send("<h1>404 Error</h1>");
});

module.exports = router;
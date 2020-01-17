// Plik centralny API - tu importujemy enpointy (index.js) z poszczegolnych katalogow
const {Router} = require('express');
const users = require('./users');
const stories = require('./stories');

// Routing
const router = Router();
router.use('/users', users);
router.use('/stories', stories);
// Inny routing idzie tutaj


module.exports = router;

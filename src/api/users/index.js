const { Router } = require('express');
const { create, showAll, login, show, update, destroy } = require('./controller');
const token = require('../../middlewares/token');
const password = require('../../middlewares/password');
const router = Router();

router.post('/',
    create);

router.get('/',
    showAll);

router.post('/login',
    password,
    login);

router.get('/:id',
    token,
    show);

router.put('/:id',
    token,
    update);

router.delete('/:id',
    token,
    destroy);

module.exports = router;

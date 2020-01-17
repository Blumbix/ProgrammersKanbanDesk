const { Router } = require('express');
const { create, showAll, show, update, destroy,
    createFeature, showFeatures, showFeature,
    updateFeature, destroyFeature} = require('./controller');
const token = require('../../middlewares/token');
const router = Router();

router.post('/',
    token,
    create);

router.get('/',
    showAll);

router.get('/:id',
    token,
    show);

router.put('/:id',
    token,
    update);

router.delete('/:id',
    token,
    destroy);

// ----------- Features ----------
router.post('/:id',
    token,
    createFeature);

router.get('/:id/findByStatus',
    token,
    showFeatures);

router.get('/:id1/:id2',
    token,
    showFeature);

router.put('/:id1/:id2',
    token,
    updateFeature);

router.delete('/:id1/:id2',
    token,
    destroyFeature);

module.exports = router;

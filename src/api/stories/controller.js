const Story = require('./model');
const Feature = require('./modelF');
const getid = require('../../middlewares/getid');

const create = async (req, res, next) => {
    try {
        const story = await Story.create(req.body);
        story.userId = getid(req);
        await story.save();
        res.json({
            story: story.view()
        })
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(409).json({
                message: 'Name already registered'
            })
        }
        next(err);
    }
};

const showAll = async (req, res, next) => {
    try {
        const id = getid(req);
        let stories = await Story.find({userId: id});
        stories = stories.map(story => story.view());
        res.json(stories);
    } catch (err) {
        next(err);
    }
};

const show = async (req, res, next) => {
    const id = req.params.id;       // ID jest stringiem (UUID)
    try {
        const userId = getid(req);
        let story = await Story.findOne({_id:id, userId:userId});
        if (story) {
            story = story.view();
            return res.status(200).json(story);
        }
        return res.status(404).end("Id not found");
    } catch (e) {
        res.end("Id not found");
        next(e);
    }
};

const update = async (req, res, next) => {
    const id = req.params.id;
    const {name} = req.body;
    try {
        const userId = getid(req);
        let story = await Story.findOne({_id:id, userId:userId});
        if (story) {
            if(name) {
                story.name = name;
                await story.save();
            }
            story = story.view();
            return res.json(story);
        } else {
            return res.status(404);
        }
    } catch (e) {
        res.end("Id not found");
        next(e);
    }
};

const destroy = async (req, res, next) => {
    const id = req.params.id;
    try {
        const userId = getid(req);
        const story = await Story.findOne({_id:id, userId:userId});
        if(story){
            await story.remove();
            return res.status(200).end("Story deleted.");
        }
        return res.status(404).end();
    } catch (e) {
        next(e)
    }
};

// ---------- Features ------------
const createFeature = async ({body, params}, res, next) => {
    const id = params.id;
    try {
        let feature = await Feature.create(body);
        feature.storyId = id;
        await feature.save();
        res.json({
            feature: feature.view()
        })
    } catch (err) {
        res.end("This title is unavailable or wrong status.");
        next(err);
    }
};

const showFeatures = async ({params, query}, res, next) => {
    const sId = params.id;
    const fStatus = query.status;
    try {
        let features;
        if (fStatus)
            features = await Feature.find({storyId: sId, status: fStatus});
        else
            features = await Feature.find({storyId: sId});
        features = features.map(feature => feature.view());
        res.json(features);
    } catch (err) {
        next(err);
    }
};

const showFeature = async ({params}, res, next) => {
    const sId = params.id1;
    const id = params.id2;
    try {
        let feature = await Feature.findOne({storyId: sId, _id: id});
        if(feature) {
            feature = feature.view();
            return res.status(200).json(feature);
        }
        return res.status(404);
    } catch (err) {
        next(err);
    }

};

const updateFeature = async ({body, params}, res, next) => {
    const sId = params.id1;
    const id = params.id2;
    const {title} = body;
    const {description} = body;
    const {status} = body;
    try {
        let feature = await Feature.findOne({storyId: sId, _id: id});
        if(feature) {
            if(title)
                feature.title = title;
            if(description)
                feature.description = description;
            if(status)
                feature.status = status;
            await feature.save();
            return res.status(200).json(feature);
        }
        return res.status(404);
    } catch (e) {
        res.end("This title is unavailable or wrong status.");
        next(e);
    }
};

const destroyFeature = async ({params}, res, next) => {
    const sId = params.id1;
    const id = params.id2;
    try {
        let feature = await Feature.findOne({storyId: sId, _id: id});
        if(feature) {
            await feature.remove();
            return res.status(200).end("Feature deleted.");
        }
        return res.status(404);
    } catch (e) {
        next(e);
    }
};


module.exports = {
    create, showAll, show, update, destroy,
    createFeature, showFeatures, showFeature, updateFeature, destroyFeature
};

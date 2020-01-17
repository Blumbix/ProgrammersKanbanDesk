const User = require('./model');
const {sign} = require("../../services/jwt");

const create = async ({body}, res, next) => {
    try {
        const user = await User.create(body);
        res.status(201).json({
            user: user.view(),
            token: sign(user)
        })
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(409).json({
                message: 'Email or username already registered'
            })
        }
        next(err);
    }

};

const showAll = async ({query}, res, next) => {
    try {
        let users = await User.find();
        users = users.map(user => user.view());
        res.json(users);
    } catch (e) {
        next(e);
    }
};

const show = async ({params}, res, next) => {
    const id = params.id;       // ID jest stringiem (UUID)
    try {
        let user = await User.findById(id);
        if (user) {
            user = user.view();
            return res.status(200).json(user);
        }
        return res.status(404);
    } catch (e) {
        next(e);
    }
};

const update = async ({body, params}, res, next) => {
    const id = params.id;
    const {username} = body;
    const {email} = body;
    const {password} = body;

    try {
        const user = await User.findById(id);
        if (user) {
            if(username)
                user.username = username;
            if(email)
                user.email = email;
            if(password)
                user.password = password;
            await user.save();
            return res.json(user);
        } else {
            return res.status(404);
        }
    } catch (e) {
        next(e);
    }

};

const destroy = async ({params}, res, next) => {
    const id = params.id;
    try {
        const user = await User.findById(id);
        if(user){
            await user.remove();
            return res.status(200).end("User deleted.");
        }
        return res.status(404).end();
    } catch (e) {
        next(e)
    }
};

const login = async (req, res, next) => {
    try {
        const user = req.user;
        const token = sign(user);

        return res.json({
            user: user.view(),
            token
        })
    } catch (e) {
        next(e)
    }
};


module.exports = {
    create, showAll, login, show, update, destroy
};

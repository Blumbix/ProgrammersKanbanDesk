const jwt = require("jsonwebtoken");
const config = require("../../config")

const sign = (user) => {
    const options = {
        expiresIn: "7d"
    };

    return jwt.sign({
        id: user.id
        // Inne pola ktore maja zostac dodane do tokenu, np. rola
    }, process.env.JWT_SECRET, options)
};

module.exports = {
    sign
};

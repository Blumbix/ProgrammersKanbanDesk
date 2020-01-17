const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];      // Bearer [TOKEN]
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {maxAge: config.jwtExpiration});

        return(decoded.id);
    } catch (error) {
        console.error(`Blad getid.`);
        res.status(401).end()
    }
};

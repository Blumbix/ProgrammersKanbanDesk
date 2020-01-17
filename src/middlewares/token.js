const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];      // Bearer [TOKEN]
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {maxAge: config.jwtExpiration});
        // Tutaj mozna sprawdzic czy uzytkownik jest w bazie, czy nie zmienily mu sie uprawnienia itd
        // Wszytsko zalezy od naszej paranoi i typu projektu
        // W tym przypadku do dalszych req przekazujemy tylko ID powiernika tokena
        req.user = {id: decoded.id};
        next();
    } catch (error) {
        console.error(`Uzyto niepoprawny token: ${req.headers.authorization}`);
        res.status(401).end()
    }
};

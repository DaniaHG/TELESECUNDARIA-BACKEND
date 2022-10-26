const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

const signOptions = {
    expiresIn: "12h",
    algorithm: "RS256"
};

function verify(req, res, next) {
    if (req.url === "/login") {
        return next();
    }
    if (!req.headers.authorization) {
        return res.status(401).send("unauthorized");
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send("unauthorized");
    }
    const payload = jwt.verify(token, process.env.PUBLIC_KEY_TOKEN, signOptions);
    req.user = payload;
    next();
}

module.exports = verify;
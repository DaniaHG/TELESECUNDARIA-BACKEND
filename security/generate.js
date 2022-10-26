const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

const signOptions = {
    expiresIn: "12h",
    algorithm: "RS256"
};

function generate(payload) {
    return jwt.sign(payload, process.env.PRIVATE_KEY_TOKEN, signOptions);
}

module.exports = generate;
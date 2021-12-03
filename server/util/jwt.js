const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config');

module.exports = {
    createToken
};

function createToken(data) {
    return jwt.sign(data, TOKEN_SECRET);
};
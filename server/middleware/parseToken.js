const jwt = require('jsonwebtoken');
const { COOKIE_NAME, TOKEN_SECRET } = require('../config');

module.exports = function parseToken() {
    return (req, res, next) => {
        const token = req.cookies[COOKIE_NAME];
        if (token) {
            try {
                const userData = jwt.verify(token, TOKEN_SECRET);
                req.user = userData;
                console.log(`Request by known user: ${userData._id}`);
                next();
            } catch (err) {
                console.log(err.message);
                res.clearCookie(COOKIE_NAME);
                res.status(401).json({ message: 'Please sign in!' });
            }
        } else {
            console.log('Request by guest user');
            next();
        }
    };
};
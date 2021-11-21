const wineService = require('../services/wineService');
const userService = require('../services/userService');

module.exports = () => (req, res, next) => {
    req.storage = {
        wineService,
        userService,
    };
    next();
};
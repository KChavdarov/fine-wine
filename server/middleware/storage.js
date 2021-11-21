const wineService = require('../services/wineService');

module.exports = () => (req, res, next) => {
    req.storage = {
        wineService,
    };
    next();
};
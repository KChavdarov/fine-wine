const router = require('express').Router();
const wineController = require('../controllers/wineController');
const userController = require('../controllers/userController');

router.use('/wine', wineController);
router.use('/user', userController);

module.exports = router;
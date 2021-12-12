const router = require('express').Router();
const wineController = require('../controllers/wineController');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');

router.use('/wine', wineController);
router.use('/user', userController);
router.use('/order', orderController);

module.exports = router;
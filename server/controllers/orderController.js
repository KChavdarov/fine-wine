const {parseErrorMessage} = require('../util/parseError');
const {isOwnerAfterPreload, isOwnerByUserId, isAuth} = require('../middleware/guards');
const {preloadOrder} = require('../util/preload');

const router = require('express').Router();

router.get('/', isAuth(), isOwnerByUserId(), async (req, res) => {
    const orderService = req.storage.order;
    const query = req.query;
    try {
        const orders = await orderService.getAllOrders(query);
        res.status(200).json(orders);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({message: errors});
    }
});

router.get('/orderId', isAuth(), preloadOrder(), isOwnerAfterPreload(), async (req, res) => {
    const order = req.data;
    res.status(200).json(order);
});

router.post('/', async (req, res) => {
    const orderService = req.storage.order;
    const user = req.user;
    const orderData = req.body;
    if (user) {
        orderData._creator = user._id;
    }
    try {
        const order = await orderService.createOrder(orderData);
        res.status(201).json(order);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({message: errors});
    }
});

module.exports = router;
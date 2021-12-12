const {parseErrorMessage} = require('../util/parseError');

const router = require('express').Router();

router.post('/', async (req, res) => {
    const orderService = req.storage.order;
    const user = req.user;
    const orderData = req.body;
    if (user) {
        orderData.user = user._id;
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
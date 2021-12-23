const {parseErrorMessage} = require('./parseError');

function preloadOrder() {
    return async (req, res, next) => {
        try {
            const order = await req.storage.order.getOrder(req.params.orderId);
            req.data = order;
            next();
        } catch (error) {
            const errors = parseErrorMessage(error);
            res.status(400).json({message: errors});
        }
    };
}


module.exports = {preloadOrder};
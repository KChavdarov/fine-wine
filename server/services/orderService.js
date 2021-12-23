const Order = require('../models/Order');

module.exports = {
    getOrder,
    createOrder,
    getAllOrders,
    updateOrder,
};

async function getOrder(orderId) {
    const order = Order.findById(orderId);
    return order;
}

async function getAllOrders(query = {}) {
    const orders = Order.find(query).sort('-_createdAt');
    return orders;
}

async function createOrder(data) {
    const order = new Order(data);
    return order.save();
}

async function updateOrder(id, data) {
    const order = await Order.findById(id);
    if (order) {
        Object.assign(order, data);
        return order.save();
    } else {
        return order;
    }
};
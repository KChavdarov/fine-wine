const Order = require('../models/Order');

module.exports = {
    createOrder,
    getOrdersByUser,
    getAllOrders,
    updateOrder,
};

async function createOrder(data) {
    const order = new Order(data);
    return Order.save();
}

async function getOrdersByUser(user) {
    const orders = Order.find({user});
    return orders;
}

async function getAllOrders(query = {}) {
    const orders = Order.find(query);
    return orders;
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
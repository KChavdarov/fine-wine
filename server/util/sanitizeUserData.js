function sanitizeUserData(user) {
    const {_id, firstName, lastName, email, phone, address, reviews, favorites, orders, cart, _createdAt, _updatedAt, _isAdmin, } = user;
    return {_id, firstName, lastName, email, phone, address, reviews, favorites, orders, cart, _createdAt, _updatedAt, _isAdmin, };
};

module.exports = {sanitizeUserData};
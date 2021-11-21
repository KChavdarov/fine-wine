const User = require('../models/User');

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
};

async function getUserById(id) {
    return User.findById(id);
};

async function getUserByEmail(email) {
    return User.findOne({email});
};

async function createUser(data) {
    const user = new User(data);
    return user.save();
};
const User = require('../models/User');

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
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

async function updateUser(id, data) {
    const user = await User.findById(id);
    if (user) {
        Object.assign(user, data);
        return user.save();
    } else {
        return user;
    }
}
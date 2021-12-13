const User = require('../models/User');

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    addFavorite,
    removeFavorite,
    getFavorites,
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

async function addFavorite(userId, wineId) {
    const user = await User.findById(userId);
    if (user) {
        const favorites = [...(new Set([wineId, ...user.favorites]))];
        user.favorites = favorites;
        return user.save();
    } else {
        return user;
    }
}

async function removeFavorite(userId, wineId) {
    const user = await User.findById(userId);
    if (user) {
        const favorites = [...(new Set(user.favorites.filter(f => f.toString() !== wineId)))];
        user.favorites = favorites;
        return user.save();
    } else {
        return user;
    }
}

async function getFavorites(userId) {
    const favorites = await User.findById(userId).select(['favorites','-_id']).populate('favorites');
    return favorites;
}
const bcrypt = require('bcrypt');
const {SALT_ROUNDS} = require('../config/index');
const wineService = require('../services/wineService');
const {getUserByEmail, createUser, getUserById} = require('../services/userService');

module.exports = () => (req, res, next) => {
    req.storage = Object.assign({}, req.storage, {
        wine: wineService,
        user: {
            verifyUser,
            register,
            login,
        },
    });
    next();
};

async function verifyUser(id) {
    return getUserById(id);
}

async function register(data) {
    const existing = await getUserByEmail(data.email);
    if (existing) {
        throw new Error('Email already in use!');
    } else {
        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
        const userData = {...data, password: hashedPassword};
        console.log(userData);
        const user = await createUser(userData);
        return user;
    }
}

async function login(data) {
    const user = await getUserByEmail(data.email);
    if (user) {
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (isMatch) {
            return user;
        } else {
            throw new Error('Wrong email or password!');
        }
    } else {
        throw new Error('Wrong email or password!');
    }
}
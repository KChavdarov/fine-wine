const Wine = require('../models/Wine.js');

module.exports = {
    getAll,
    getOne,
    create,
    deleteOne,
};

async function getAll() {
    return Wine.find({isDeleted: false});
}

async function getOne(id) {
    return Wine.findOne({id, isDeleted: false});
}

async function create(data) {
    const wine = new Wine(data);
    return wine.save();
}

async function deleteOne(id) {
    try {
        const wine = await getOne(id);
        wine.isDeleted = true;
        return wine.save();
    } catch (error) {
        return error.message;
    }
};
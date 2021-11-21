import {findOne} from '../models/Wine.js';

const Wine = require('../models/Wine.js');

module.exports = {
    getAll,
    getOne,
    create,
    deleteOne,
};

export async function getAll() {
    return Wine.find({isDeleted: false});
}

export async function getOne(id) {
    return Wine.findOne({id, isDeleted: false});
}

export async function create(data) {
    const wine = new Wine(data);
    return wine.save();
}

export async function deleteOne(id) {
    try {
        const wine = await findOne(id);
        wine.isDeleted = true;
        return wine.save();
    } catch (error) {
        return error.message;
    }
};
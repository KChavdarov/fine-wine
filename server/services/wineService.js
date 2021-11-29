const Wine = require('../models/Wine.js');

module.exports = {
    getAll,
    getOne,
    create,
    deleteOne,
    getCategories,
};

async function getCategories() {
    const fields = [
        'type',
        'brand',
        'grape',
        'country',
        'region',
        'year',
        'volume',
        'currentPrice',
        'isPromo'
    ];

    function getDistinct(field) {
        return Wine.find().distinct(field);
    }

    // const fields = Object.keys(Wine.schema.obj);

    const distinctFields = fields.map((field) => getDistinct(field).then((result) => ({[field]: result})));
    const categories = Object.assign(... await Promise.all(distinctFields));

    return categories;
}

async function getAll(query = {}) {
    query.isDeleted = false;
    return Wine.find(query);
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
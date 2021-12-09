const Wine = require('../models/Wine.js');

module.exports = {
    getAll,
    getOne,
    create,
    deleteOne,
    getCategories,
    getLatest,
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
        return Wine.find({isDeleted: false}).distinct(field);
    }

    // const fields = Object.keys(Wine.schema.obj);

    const distinctFields = fields.map((field) => getDistinct(field).then((result) => ({[field]: result})));
    const categories = Object.assign(... await Promise.all(distinctFields));

    categories.minPrice = Math.floor(Math.min(...categories.currentPrice));
    categories.maxPrice = Math.ceil(Math.max(...categories.currentPrice));

    delete categories.currentPrice;

    return categories;
}

async function getAll(data = {}) {
    const query = {...data};
    query.isDeleted = false;
    if (query.grape) {
        query.grape = {$in: query.grape};
    }

    if (data.minPrice || data.maxPrice) {
        query.currentPrice = {};

        if (data.minPrice) {
            query.currentPrice['$gte'] = data.minPrice;
        };

        if (data.maxPrice) {
            query.currentPrice['$lte'] = data.maxPrice;
        }
    }
    console.log(query);
    return Wine.find(query);
}

async function getLatest(data = {}) {
    const query = {...data};
    query.isDeleted = false;
    return Wine.find(query).limit(data.limit || 5).sort('-_createdAt');
}

async function getOne(id) {
    return Wine.findById(id).where({_isDeleted: false});
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
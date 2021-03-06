const Wine = require('../models/Wine.js');

module.exports = {
    getAll,
    getOne,
    create,
    deleteOne,
    getCategories,
    getLatest,
    update,
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
    ];

    function getDistinct(field) {
        return Wine.find({_isDeleted: false}).distinct(field);
    }

    const distinctFields = fields.map((field) => getDistinct(field).then((result) => ({[field]: result})));
    const categories = Object.assign(... await Promise.all(distinctFields));

    categories.minPrice = Math.floor(Math.min(...categories.currentPrice));
    categories.maxPrice = Math.ceil(Math.max(...categories.currentPrice));

    categories.minYear = Math.floor(Math.min(...categories.year));
    categories.maxYear = Math.ceil(Math.max(...categories.year));

    delete categories.currentPrice;
    delete categories.year;

    return categories;
}

async function getAll(data = {}) {
    const {_id, type, brand, grape, country, region, minYear, maxYear, volume, minPrice, maxPrice, page = 1, perPage = 12, sort = '-isPromo'} = data;
    const query = {_isDeleted: false};
    if (_id) {query._id = _id;}
    if (type) {query.type = type;}
    if (brand) {query.brand = brand;}
    if (country) {query.country = country;}
    if (region) {query.region = region;}
    if (volume) {query.volume = volume;}
    if (grape) {query.grape = {$in: grape};}
    if (minPrice || maxPrice) {
        query.currentPrice = {};

        if (minPrice) {
            query.currentPrice['$gte'] = data.minPrice;
        };

        if (maxPrice) {
            query.currentPrice['$lte'] = data.maxPrice;
        }
    }
    if (minYear || maxYear) {
        query.year = {};

        if (minYear) {
            query.year['$gte'] = data.minYear;
        };

        if (maxYear) {
            query.year['$lte'] = data.maxYear;
        }
    }
    const wines = await Wine.find(query)
        .skip(Number(perPage) * (Math.max(Number(page) - 1, 0)) || 0)
        .limit(Number(perPage) || 12)
        .sort(sort || '');
    const count = await Wine.countDocuments(query);

    return {
        wines,
        count,
        page: Number(page),
        perPage: Number(perPage),
        sort,
    };

}

async function getLatest(data = {}) {
    const query = {...data};
    query._isDeleted = false;
    return Wine.find(query).limit(data.limit || 4).sort('-_createdAt');
}

async function getOne(id) {
    return Wine.findById(id).where({_isDeleted: false});
}

async function create(data) {
    const wine = new Wine(data);
    return wine.save();
}

async function update(wineId, data) {
    const wine = await Wine.findById(wineId);
    if (wine) {
        Object.assign(wine, data, {_updatedAt: Date.now()});
        return wine.save();
    } else {
        return wine;
    }
}

async function deleteOne(id) {
    try {
        const wine = await getOne(id);
        wine._isDeleted = true;
        return wine.save();
    } catch (error) {
        return error.message;
    }
};
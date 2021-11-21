const {Schema, model} = require('mongoose');

const wineSchema = new Schema({
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    _createdAt: {
        type: Date,
        default: Date.now(),
    },
    _updatedAt: {
        type: Date,
    },
    _isDeleted: {
        type: Boolean,
        default: false,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
    }],
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Red', 'White', 'Rose', 'Sparkling', 'Dessert']
    },
    brand: {
        type: String,
        required: true,
    },
    grape: [{
        type: String,
        required: true,
    }],
    country: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    volume: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isPromo:{
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        default: 0,
    }

});

module.exports = model('Wine', wineSchema);
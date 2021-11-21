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
    basePrice: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
    },
    // isPromo:{
    //     type: Boolean,
    //     default: false,
    // },
}, {toJSON: {virtuals: true}});

wineSchema.virtual('isPromo').get(function () {return this.discountPercentage > 0;});
wineSchema.virtual('currentPrice').get(function () {return Number((this.basePrice * (1 - (this.discountPercentage / 100))).toFixed(2));});

module.exports = model('Wine', wineSchema);
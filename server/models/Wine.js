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
        enum: ['red', 'white', 'rose', 'sparkling', 'dessert']
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
        min: 0,
    },
    image: {
        type: String,
        required: true,
    },
    discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    isPromo: {
        type: Boolean,
        default: function () {return this.discountPercentage > 0;},
    },
    currentPrice: {
        type: Number,
        default: function () {return Number((this.basePrice * (1 - (this.discountPercentage / 100))).toFixed(2));}
    }
},
    //  {toJSON: {virtuals: true}}
);

// wineSchema.virtual('isPromo').get(function () {return this.discountPercentage > 0;});
// wineSchema.virtual('currentPrice').get(function () {return Number((this.basePrice * (1 - (this.discountPercentage / 100))).toFixed(2));});

module.exports = model('Wine', wineSchema);
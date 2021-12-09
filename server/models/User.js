const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    _isAdmin: {
        type: Boolean,
        default: false,
    },
    _createdAt: {
        type: Date,
        default: Date.now(),
    },
    _updatedAt: {
        type: Date,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
    }],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Wine',
    }],
    cart: [{
        wine: {type: Schema.Types.ObjectId, ref: 'Wine', },
        quantity: {type: Number, default: 1, min: 1},
    }],
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = model('User', userSchema);
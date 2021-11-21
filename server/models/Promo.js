const {Schema, model} = require('mongoose');

const promoSchema = new Schema({
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    _createdAt: {
        type: Date,
        default: Date.now(),
    },
    _updatedAt: {
        type: Date,
    },
    title: {
        type: String,
        required: true,
    },
    wines: [{
        type: Schema.Types.ObjectId,
        ref: 'Wine',
    }],
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
    },
});

module.exports = model('Promo', promoSchema);
const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    _createdAt: {
        type: Date,
        default: Date.now(),
    },
    _updatedAt: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    wine: {
        type: Schema.Types.ObjectId,
        ref: 'Wine',
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
    }
});

module.exports = model('Review', reviewSchema);
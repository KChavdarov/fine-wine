const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    _createdAt: {
        type: Date,
        default: Date.now(),
    },
    _updatedAt: {
        type: Date,
    },
    // _isComplete: {
    //     type: Boolean,
    //     default: false,
    // },
    status: {
        type: String,
        default: 'New',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    details: [{
        wine: {type: Schema.Types.ObjectId, ref: 'Wine'},
        quantity: {type: Number, default: 1, min: 1},
        price: {type: Number, default: 1, min: 1}
    }],
});
orderSchema.virtual('_isComplete').get(function () {return this.status != 'Complete';});

module.exports = model('Order', orderSchema);
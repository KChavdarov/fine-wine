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
        default: 'new',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    recipient: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        address: {type: String, required: true},
    },
    items: [{
        wine: {type: Schema.Types.ObjectId, ref: 'Wine'},
        quantity: {type: Number, default: 1, min: 1},
        price: {type: Number, default: 1, min: 1}
    }],
}, {toJSON: {virtuals: true}});
orderSchema.virtual('_isComplete').get(function () {return this.status != 'Complete';});

module.exports = model('Order', orderSchema);
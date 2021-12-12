const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    _createdAt: {
        type: Date,
        default: Date.now(),
    },
    _updatedAt: {
        type: Date,
    },
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
        _id:false,
        wine: {type: Schema.Types.ObjectId, ref: 'Wine', required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
        itemTotal: {type: Number, default: function () {return Number((this.price * this.quantity).toFixed(2));}},
    }],
    value: {
        type: Number,
        default: function () {return this.items.reduce((a, c) => a + c.itemTotal, 0);}
    },
}, {toJSON: {virtuals: true}});
orderSchema.virtual('_isComplete').get(function () {return this.status != 'Complete';});

module.exports = model('Order', orderSchema);
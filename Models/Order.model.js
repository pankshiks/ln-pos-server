const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define a separate schema for maintaining the order sequence
const OrderSequenceSchema = new Schema({
    sequence_value: {
        type: Number,
        default: 1
    }
});
const OrderSequence = mongoose.model('OrderSequence', OrderSequenceSchema);

const OrderSchema = new Schema({
    order: {
        type: String,
        unique: true
    },
    payment_method: {
        type: String,
        required: true,
    },
    total_tax: {
        type: Number,
        required: true,
    },
    order_amount: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    paid_amount: {
        type: Number,
        required: true,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    product: {
        type: Schema.Types.Array,
        ref: 'Products'
    },
}, {
    timestamps: true
})

// Pre-save middleware to auto-increment order number
OrderSchema.pre('save', async function(next) {
    try {
        if (!this.order) {
            const orderSeq = await OrderSequence.findOneAndUpdate({}, { $inc: { sequence_value: 1 } }, { new: true, upsert: true });
            const paddedOrderNumber = String(orderSeq.sequence_value).padStart(6, '0'); // Pad with leading zeros
            this.order = paddedOrderNumber;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Order = mongoose.model('order', OrderSchema)
module.exports = Order
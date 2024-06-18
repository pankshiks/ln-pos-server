const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoiceSequenceSchema = new Schema({
    sequence_value: {
        type: Number,
        default: 1
    }
});
const InvoiceSequence = mongoose.model('InvoiceSequence', InvoiceSequenceSchema);

const InvoiceSchema = new Schema({
    customer_details: {
        type: Object,
        required: true,
    },
    cart_items: {
        type: Array,
        required: true,
    },
    invoice_pdf: {
        type: Buffer
    },
    invoice_id: {
        type: String,
        unique: true
    },
}, {
    timestamps: true
})

InvoiceSchema.pre('save', async function(next) {
    try {
        if (!this.invoice_id) {
            const invoiceSeq = await InvoiceSequence.findOneAndUpdate({}, { $inc: { sequence_value: 1 } }, { new: true, upsert: true });
            const paddedOrderNumber = String(invoiceSeq.sequence_value).padStart(6, '0'); // Pad with leading zeros
            this.invoice_id = `LN-${paddedOrderNumber}`;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Invoice = mongoose.model('invoice', InvoiceSchema)
module.exports = Invoice
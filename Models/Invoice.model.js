const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        type: String
    }
}, {
    timestamps: true
})

const Invoice = mongoose.model('invoice', InvoiceSchema)
module.exports = Invoice
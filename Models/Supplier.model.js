const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SupplierSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
    },
    zip_code: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const Supplier = mongoose.model('supplier', SupplierSchema)
module.exports = Supplier
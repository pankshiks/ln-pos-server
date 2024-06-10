const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
    },
}, {
    timestamps: true
})

const Customer = mongoose.model('customer', CustomerSchema)
module.exports = Customer
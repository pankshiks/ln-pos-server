const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShopSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    vat: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
    }
}, {
    timestamps: true
})

const Shop = mongoose.model('shop', ShopSchema)
module.exports = Shop
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    qtn: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
    },
    selling_price: {
        type: Number,
        required: true,
    },
    purchase_price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const Products = mongoose.model('products', ProductSchema)
module.exports = Products
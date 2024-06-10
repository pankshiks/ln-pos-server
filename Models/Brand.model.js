const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    name: {
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

const Brand = mongoose.model('brands', BrandSchema)
module.exports = Brand
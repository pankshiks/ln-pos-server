const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UnitSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const Unit = mongoose.model('units', UnitSchema)
module.exports = Unit
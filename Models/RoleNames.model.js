const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleNameSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
})

const RoleName = mongoose.model('role_names', RoleNameSchema)
module.exports = RoleName
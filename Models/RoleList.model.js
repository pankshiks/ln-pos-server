const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleListSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'RoleName'
    }],
    status: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
})

const RoleList = mongoose.model('role_list', RoleListSchema)
module.exports = RoleList
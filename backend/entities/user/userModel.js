const {Schema, model} = require('mongoose')
const status = require('../../constans/status')
const roles = require('../../constans/roles')

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: function () { return this.isNew }
        },
        lastname: {
            type: String,
            required: function () { return this.isNew }
        },
        phone: {
            type: String,
            required: function () { return this.isNew }
        },
        email: {
            type: String,
            required: function () { return this.isNew },
            unique: true
        },
        password: {
            type: String,
            required: function () { return this.isNew }
        },
        role: {
            type: String,
            enum: [roles.ADMIN_ROLE, roles.PROFESSOR_ROLE, roles.STUDENT_ROLE],
        },
        status: {
            type: String,
            enum: [status.PENDING, status.ACTIVE, status.INACTIVE],
            default: status.PENDING
        }
    },
    {
        timestamps: true,
    }
)

module.exports = model('User', UserSchema, 'users')
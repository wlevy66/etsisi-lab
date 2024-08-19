const {Schema, model} = require('mongoose')
const status = require('../../constans/status')
const roles = require('../../constans/roles')

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: [roles.ADMIN_ROLE, roles.PROFESSOR_ROLE, roles.STUDENT_ROLE],
            required: true
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
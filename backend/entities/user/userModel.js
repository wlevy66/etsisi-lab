const {Schema, model} = require('mongoose')
const status = require('../../constans/status')
const roles = require('../../constans/roles')

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: this.isNew
        },
        lastname: {
            type: String,
            required: this.isNew
        },
        phone: {
            type: String,
            required: this.isNew
        },
        email: {
            type: String,
            required: this.isNew,
            unique: true
        },
        password: {
            type: String,
            required: this.isNew
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
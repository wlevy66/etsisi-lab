const ROLE = {
    PROFESSOR: 'professor',
    STUDENT: 'student',
    ADMIN: 'admin'
}

const STATUS = {
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive'
}

const {Schema, model} = require('mongoose')

const UserSchema = new Schema(
    {
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
            enum: [ROLE.PROFESSOR, ROLE.STUDENT, ROLE.ADMIN],
            required: true
        },
        status: {
            type: String,
            enum: [STATUS.PENDING, STATUS.ACTIVE, STATUS.INACTIVE],
            default: STATUS.PENDING
        }
    },
    {
        timestamps: true,
    }
)


module.exports = model('User', UserSchema, 'users')
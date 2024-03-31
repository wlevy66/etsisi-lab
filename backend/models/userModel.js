const ROLE = {
    PROFESSOR: 'professor',
    STUDENT: 'student'
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
            enum: [ROLE.PROFESSOR, ROLE.STUDENT],
            required: true
        }
    },
    {
        timestamps: true,
    }
)


module.exports = model('User', UserSchema, 'users')
const { Schema, model } = require('mongoose')

const RoomSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        capacity: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = model('Room', RoomSchema, 'rooms')
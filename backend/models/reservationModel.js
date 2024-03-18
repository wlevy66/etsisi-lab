
const {Schema, model} = require('mongoose')

const ReservationSchema = new Schema(
    {
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    room: {
        type: Schema.ObjectId,
        ref: 'Room'
    },
    schedule: {
        type: Schema.ObjectId,
        ref: 'Schedule'
    }
    },
    {
        timestamps: true,
    }
)


module.exports = model('Reservation', ReservationSchema, 'reservations')
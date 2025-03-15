const { Schema, model } = require('mongoose')

const ScheduleModel = new Schema(
    {
        room: {
            type: Schema.ObjectId,
            ref: 'Room'
        },
        day: {
            type: Date,
            required: true
        },
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        reservedBy: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
)

module.exports = model('Schedule', ScheduleModel, 'schedules')
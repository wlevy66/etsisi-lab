
const {Schema, model} = require('mongoose')

const ScheduleModel = new Schema(
    {
    room: {
        type: Schema.ObjectId,
        ref: 'Room'
    },
    start: {
        type: Date,
        default: Date.now()
    },
    end: {
        type: Date,
        default: Date.now
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
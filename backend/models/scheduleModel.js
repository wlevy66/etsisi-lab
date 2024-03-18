
const {Schema, model} = require('mongoose')

const ScheduleModel = new Schema(
    {
    room: {
        type: Schema.ObjectId,
        ref: 'Room'
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: Date.now
    }
    },
    {
        timestamps: true,
    }
)


module.exports = model('Schedule', ScheduleModel, 'schedules')
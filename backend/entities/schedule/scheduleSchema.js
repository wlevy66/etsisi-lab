const Joi = require('joi')
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const schemaScheduleCreate = Joi.object({
    room: Joi.string().required(),
    day: Joi.date().greater('now').required()
        .messages({
            'any.required': 'Day is required',
            'date.greater': 'Day should be greater than current date'
        }),
    start: Joi.date().required()
        .custom((value, helper) => {
            const startHour = new Date(value)
            startHour.setMinutes(startHour.getMinutes() + startHour.getTimezoneOffset())
            if (startHour.getHours() < 9) {
                return helper.message('Start time should be after 09:00')
            }
            else if (startHour.getHours() > 17) {
                return helper.message('Start time should be before 17:00')
            }
            return value
        })
        .messages({
            'any.required': 'Start time is required',
        }),
    end: Joi.date().required().greater(Joi.ref('start'))
        .custom((value, helper) => {
            const endHour = new Date(value)
            endHour.setMinutes(endHour.getMinutes() + endHour.getTimezoneOffset())
            if (endHour.getHours() > 17) {
                console.log(value.getHours())
                return helper.message('End time should be before 18:00')
            }
            return value
        })
        .messages({
            'date.greater': 'End time should be greater than start time',
            'any.required': 'End time is required',
        }),
    reservedBy: Joi.number()
})

const schemaScheduleUpdate = Joi.object({
    day: Joi.date().greater('now').required()
        .messages({
            'any.required': 'Day is required',
            'date.greater': 'Day should be greater than current date'
        }),
        start: Joi.date().required()
        .custom((value, helper) => {
            const startHour = new Date(value)
            startHour.setMinutes(startHour.getMinutes() + startHour.getTimezoneOffset())
            if (startHour.getHours() < 9) {
                return helper.message('Start time should be after 09:00')
            }
            else if (startHour.getHours() > 17) {
                return helper.message('Start time should be before 17:00')
            }
            return value
        })
        .messages({
            'any.required': 'Start time is required',
        }),
    end: Joi.date().required().greater(Joi.ref('start'))
        .custom((value, helper) => {
            const endHour = new Date(value)
            endHour.setMinutes(endHour.getMinutes() + endHour.getTimezoneOffset())
            if (endHour.getHours() > 17) {
                console.log(value.getHours())
                return helper.message('End time should be before 18:00')
            }
            return value
        })
        .messages({
            'any.required': 'End time is required',
            'date.greater': 'End time should be greater than start time'
        })
})

module.exports = {
    schemaScheduleCreate,
    schemaScheduleUpdate
}
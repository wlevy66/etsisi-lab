const Joi = require('joi')

const schemaScheduleCreate = Joi.object({
    room: Joi.string().required(),
    day: Joi.date().greater('now').required()
        .messages({
            'any.required': 'La fecha es requerida',
            'date.greater': 'La fecha debe ser mayor a la actual'
        }),
    start: Joi.date().required()
        .custom((value, helper) => {
            const startHour = new Date(value)
            startHour.setMinutes(startHour.getMinutes() + startHour.getTimezoneOffset())
            if (startHour.getHours() < 9) {
                return helper.message('La hora de inicio debe ser después de las 09:00')
            }
            else if (startHour.getHours() > 17) {
                return helper.message('La hora de inicio debe ser antes de las 17:00')
            }
            return value
        })
        .messages({
            'any.required': 'La hora de inicio es requerida'
        }),
    end: Joi.date().required().greater(Joi.ref('start'))
        .custom((value, helper) => {
            const endHour = new Date(value)
            endHour.setMinutes(endHour.getMinutes() + endHour.getTimezoneOffset())
            if (endHour.getHours() > 17) {
                return helper.message('La hora de fin debe ser antes de las 18:00')
            }
            return value
        })
        .messages({
            'date.greater': 'La hora de fin debe ser mayor a la de inicio',
            'any.required': 'La hora de fin es requerida'
        }),
    reservedBy: Joi.number()
})

const schemaScheduleUpdate = Joi.object({
    day: Joi.date().greater('now').required()
        .messages({
            'any.required': 'La fecha es requerida',
            'date.greater': 'La fecha debe ser mayor a la actual'
        }),
        start: Joi.date().required()
        .custom((value, helper) => {
            const startHour = new Date(value)
            startHour.setMinutes(startHour.getMinutes() + startHour.getTimezoneOffset())
            if (startHour.getHours() < 9) {
                return helper.message('La hora de inicio debe ser después de las 09:00')
            }
            else if (startHour.getHours() > 17) {
                return helper.message('La hora de inicio debe ser antes de las 17:00')
            }
            return value
        })
        .messages({
            'any.required': 'La hora de inicio es requerida'
        }),
    end: Joi.date().required().greater(Joi.ref('start'))
        .custom((value, helper) => {
            const endHour = new Date(value)
            endHour.setMinutes(endHour.getMinutes() + endHour.getTimezoneOffset())
            if (endHour.getHours() > 17) {
                return helper.message('La hora de fin debe ser antes de las 18:00')
            }
            return value
        })
        .messages({
            'date.greater': 'La hora de fin debe ser mayor a la de inicio',
            'any.required': 'La hora de fin es requerida'
        })
})

module.exports = {
    schemaScheduleCreate,
    schemaScheduleUpdate
}
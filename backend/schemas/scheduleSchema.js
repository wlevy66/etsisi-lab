const Joi = require('joi')

const schemaSchedule = Joi.object({
    room: Joi.string().required(),
    start: Joi.date().greater('now').required()
        .messages({
            'any.required': 'Start date is required',
            'date.greater': 'Start date should be greater than current date'
        }),
    end: Joi.date().greater(Joi.ref('start')).required()
        .messages({
            'date.greater': 'End date should be greater than start date',
            'any.required': 'End date is required',
        }),
    reservedBy: Joi.number()
})

module.exports = schemaSchedule
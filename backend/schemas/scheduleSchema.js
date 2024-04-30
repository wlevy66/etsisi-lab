const Joi = require('joi')

const schemaSchedule = Joi.object({
    room: Joi.string().required(),
    start: Joi.date().required()
        .messages({
            'any.required': 'Start date is required',
        }),
    end: Joi.date().greater(Joi.ref('start')).required()
        .messages({
            'date.greater': 'End date should be greater than start date',
            'any.required': 'End date is required',
        })
})

module.exports = schemaSchedule
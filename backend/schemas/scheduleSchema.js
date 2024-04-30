const Joi = require('joi')

const schemaSchedule = Joi.object({
    room: Joi.string().required(),
    start: Joi.date().required(),
    end: Joi.date().greater(Joi.ref('start')).required(),
})

module.exports = schemaSchedule
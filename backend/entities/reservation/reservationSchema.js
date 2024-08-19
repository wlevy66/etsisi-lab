const Joi = require('joi')

const reservationSchemaCreate = Joi.object({
    schedule: Joi.string().required()
        .messages({
            'any.required': `El horario es un campo requerido`
        })
})

const reservationSchemaUpdate = Joi.object({
    schedule: Joi.string().required()
        .messages({
            'any.required': `El horario es un campo requerido`
        })
})

module.exports = {
    reservationSchemaCreate,
    reservationSchemaUpdate
}




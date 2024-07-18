const Joi = require('joi')

const reservationSchemaCreate = Joi.object({
    user: Joi.string().required()
        .messages({
            'any.required': `User is a required field`
        
        }),
    schedule: Joi.string().required()
        .messages({
            'any.required': `Schedule is a required field`
        })
})

const reservationSchemaUpdate = Joi.object({
    schedule: Joi.string().required()
        .messages({
            'any.required': `Schedule is a required field`
        })
})

module.exports = {
    reservationSchemaCreate,
    reservationSchemaUpdate
}




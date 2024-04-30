const Joi = require('joi')

const reservationSchema = Joi.object({
    user: Joi.string().required()
        .messages({
            'any.required': `User is a required field`
        
        }),
    schedule: Joi.string().required()
        .messages({
            'any.required': `Schedule is a required field`
        })
})

module.exports = reservationSchema




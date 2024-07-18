const Joi = require('joi')


const schemaUser = Joi.object({
    email: Joi.string().email().pattern(new RegExp('.*@(alumnos\.upm\.es|upm\.es|email\.es)$')).required()
        .messages({
            'string.email': `Email must be a valid email`,
            'string.empty': `Email cannot be an empty field`,
            'any.required': `Email is a required field`,
            'string.pattern.base': `Email must be a valid email from UPM domain`
        }),
    password: Joi.string().required()
        .messages({
            'string.empty': `Password cannot be an empty field`,
            'any.required': `Password is a required field`
        })
})

module.exports = schemaUser




const Joi = require('joi')

const schemaRoom = Joi.object({
    name: Joi.string().trim().alphanum().min(3).max(30).required()
        .messages({
            'string.base': `Name should be a type of text`,
            'string.empty': `Name cannot be an empty field`,
            'string.min': `Name should have a minimum length of {#limit}`,
            'string.max': `Name should have a maximum length of {#limit}`,
            'any.required': `Name is a required field`
        
        }),
    capacity: Joi.number().integer().min(1).required()
        .messages({
            'number.base': `Capacity should be a type of number`,
            'number.empty': `Capacity cannot be an empty field`,
            'number.min': `Capacity should have a minimum value of {#limit}`,
            'any.required': `Capacity is a required field`
        })
})

module.exports = schemaRoom




const Joi = require('joi')

const roomSchema = Joi.object({
    name: Joi.string().trim().alphanum().min(3).max(30).required()
        .messages({
            'string.base': `El nombre debe ser de tipo texto`,
            'string.empty': `El nombre no puede ser un campo vacío`,
            'string.min': `El nombre debe tener una longitud mínima de {#limit}`,
            'string.max': `El nombre debe tener una longitud máxima de {#limit}`,
            'any.required': `Nombre es un campo requerido`
        }),
    capacity: Joi.number().integer().min(1).required()
        .messages({
            'number.base': `La capacidad debe ser de tipo numérico`,
            'number.empty': `La capacidad no puede ser un campo vacío`,
            'number.min': `La capacidad debe ser mayor a {#limit}`,
            'any.required': `Capacidad es un campo requerido`
        })
})

module.exports = roomSchema
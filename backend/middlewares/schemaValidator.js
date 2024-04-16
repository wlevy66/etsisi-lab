const Joi = require('joi');

const schemaRoom = Joi.object({
    name: Joi.string().trim().alphanum().min(3).max(30).required(),
    capacity: Joi.number().integer().min(1).required()
});

module.exports = schemaRoom




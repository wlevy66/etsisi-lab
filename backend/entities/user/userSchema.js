const Joi = require('joi')
const status = require('../../constans/status')
const roles = require('../../constans/roles')

const userSchemaLogin = Joi.object({
    email: Joi.string().email().required()
        .messages({
            'string.empty': `Email cannot be an empty field`,
            'string.email': `Email must be a valid email`,
            'any.required': `Email is a required field`
        }),
    password: Joi.string().required()
        .messages({
            'string.empty': `Password cannot be an empty field`,
            'any.required': `Password is a required field`
        })
})

const userSchemaRegister = Joi.object({
    name: Joi.string().required()
        .messages({
            'string.empty': `Name cannot be an empty field`,
            'any.required': `Name is a required field`
        }),
    lastname: Joi.string().required()
        .messages({
            'string.empty': `Lastname cannot be a empty field`,
            'any.required': `Lastname is a required field`
        }),
    phone: Joi.string().length(9).pattern(new RegExp('^[0-9]{9}$')).required()
        .messages({
            'string.empty': `Phone cannot be a empty field`,
            'string.length': `Phone must have 9 digits`,
            'string.pattern.base': `Phone must have 9 digits`,
            'any.required': `Phone is a required field`
        }),
    email: Joi.string().email().pattern(new RegExp('.*@(alumnos\.upm\.es|upm\.es|email\.es)$')).required()
        .messages({
            'string.empty': `Email cannot be an empty field`,
            'string.email': `Email must be a valid email`,
            'string.pattern.base': `Email must be a valid email from UPM domain`,
            'any.required': `Email is a required field`
        }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')).required()
        .messages({
            'string.empty': `Password cannot be an empty field`,
            'string.pattern.base': `Password must be alphanumeric and have at least 8 characters`,
            'any.required': `Password is a required field`
        }),
    confirmPassword: Joi.ref('password')
})

const userSchemaUpdateProfile = Joi.object({
    name: Joi.string().required()
        .messages({
            'string.empty': `Name cannot be an empty field`,
            'any.required': `Name is a required field`
        }),
    lastname: Joi.string().required()
        .messages({
            'string.empty': `Lastname cannot be a empty field`,
            'any.required': `Lastname is a required field`
        }),
    phone: Joi.string().length(9).pattern(new RegExp('^[0-9]{9}$')).required()
        .messages({
            'string.empty': `Phone cannot be a empty field`,
            'string.length': `Phone must have 9 digits`,
            'string.pattern.base': `Phone must have 9 digits`,
            'any.required': `Phone is a required field`
        })
})

const userSchemaUpdatePassword = Joi.object({
    currentPassword: Joi.string().required()
        .messages({
            'string.empty': `Current password cannot be an empty field`,
            'any.required': `Current password is a required field`
        }),
    newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')).required()
        .messages({
            'string.empty': `New password cannot be an empty field`,
            'string.pattern.base': `New password must be alphanumeric and have at least 8 characters`,
            'any.required': `New password is a required field`
        }),
    confirmPassword: Joi.ref('newPassword')
})

const userSchemaUpdateByAdmin = Joi.object({
    email: Joi.string().email().pattern(new RegExp('.*@(alumnos\.upm\.es|upm\.es|email\.es)$')).required()
        .messages({
            'string.empty': `Email cannot be an empty field`,
            'string.email': `Email must be a valid email`,
            'string.pattern.base': `Email must be a valid email from UPM domain`,
            'any.required': `Email is a required field`
        }),
    role: Joi.string().valid(roles.ADMIN_ROLE, roles.PROFESSOR_ROLE, roles.STUDENT_ROLE).required()
        .messages({
            'string.empty': `Role cannot be an empty field`,
            'string.valid': `Role must be 'admin', 'professor' or 'student'`,
            'any.required': `Role is a required field`
        }),
    status: Joi.string().valid(status.ACTIVE, status.INACTIVE, status.INACTIVE).required()
        .messages({
            'string.empty': `Status cannot be an empty field`,
            'string.valid': `Status must be 'pending', 'active' or 'inactive'`,
            'any.required': `Status is a required field`
        })
})

module.exports = {
    userSchemaLogin,
    userSchemaRegister,
    userSchemaUpdateProfile,
    userSchemaUpdatePassword,
    userSchemaUpdateByAdmin
}




const Joi = require('joi')
const status = require('../../constants/status')
const roles = require('../../constants/roles')

const userSchemaLogin = Joi.object({
    email: Joi.string().email().required()
        .messages({
            'string.empty': `El email no puede estar vacío`,
            'string.email': `El email debe ser un email válido`,
            'any.required': `El email es un campo requerido`
        }),
    password: Joi.string().required()
        .messages({
            'string.empty': `La contraseña no puede estar vacía`,
            'any.required': `La contraseña es un campo requerido`
        })
})

const userSchemaRegister = Joi.object({
    name: Joi.string().required()
        .messages({
            'string.empty': `El nombre no puede estar vacío`,
            'any.required': `El nombre es un campo requerido`
        }),
    lastname: Joi.string().required()
        .messages({
            'string.empty': `Los apellidos no pueden estar vacíos`,
            'any.required': `Los apellidos son un campo requerido`
        }),
    phone: Joi.string().pattern(new RegExp('^[0-9]{9}$')).required()
        .messages({
            'string.empty': `El teléfono no puede estar vacío`,
            'string.pattern.base': `El teléfono debe tener 9 dígitos`,
            'any.required': `El teléfono es un campo requerido`
        }),
    email: Joi.string().email().pattern(new RegExp('.*@(alumnos\.upm\.es|upm\.es|email\.es)$')).required()
        .messages({
            'string.empty': `El email no puede estar vacío`,
            'string.email': `El email debe ser un email válido`,
            'string.pattern.base': `El email debe ser un email válido del dominio UPM`,
            'any.required': `El email es un campo requerido`
        }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')).required()
        .messages({
            'string.empty': `La contraseña no puede estar vacía`,
            'string.pattern.base': `La contraseña debe ser alfanumérica y tener al menos 8 caracteres`,
            'any.required': `La contraseña es un campo requerido`
        }),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required()
        .messages({
            'any.only': `Las contraseñas no coinciden`
        })
        
})

const userSchemaUpdateProfile = Joi.object({
    name: Joi.string().required()
        .messages({
            'string.empty': `El nombre no puede estar vacío`,
            'any.required': `El nombre es un campo requerido`
        }),
    lastname: Joi.string().required()
        .messages({
            'string.empty': `Los apellidos no pueden estar vacíos`,
            'any.required': `Los apellidos son un campo requerido`
        }),
    phone: Joi.string().pattern(new RegExp('^[0-9]{9}$')).required()
        .messages({
            'string.empty': `El teléfono no puede estar vacío`,
            'string.pattern.base': `El teléfono debe tener 9 dígitos`,
            'any.required': `El teléfono es un campo requerido`
        })
})

const userSchemaUpdatePassword = Joi.object({
    currentPassword: Joi.string().required()
        .messages({
            'string.empty': `La contraseña actual no puede estar vacía`,
            'any.required': `La contraseña actual es un campo requerido`
        }),
    newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')).required()
        .messages({
            'string.empty': `La nueva contraseña no puede estar vacía`,
            'string.pattern.base': `La nueva contraseña debe ser alfanumérica y tener al menos 8 caracteres`,
            'any.required': `La nueva contraseña es un campo requerido`
        }),
    confirmPassword: Joi.any().equal(Joi.ref('newPassword')).required()
        .messages({
            'any.only': `Las contraseñas no coinciden`
        })
})

const userSchemaUpdateByAdmin = Joi.object({
    email: Joi.string().email().pattern(new RegExp('.*@(alumnos\.upm\.es|upm\.es|email\.es)$')).required()
        .messages({
            'string.empty': `El email no puede estar vacío`,
            'string.email': `El email debe ser un email válido`,
            'string.pattern.base': `El email debe ser un email válido del dominio UPM`,
            'any.required': `El email es un campo requerido`
        }),
    role: Joi.string().valid(roles.ADMIN_ROLE, roles.PROFESSOR_ROLE, roles.STUDENT_ROLE).required()
        .messages({
            'string.empty': `El rol no puede estar vacío`,
            'string.valid': `El rol debe ser 'admin', 'professor' o 'student'`,
            'any.required': `El rol es un campo requerido`
        }),
    status: Joi.string().valid(status.ACTIVE, status.INACTIVE, status.INACTIVE).required()
        .messages({
            'string.empty': `El estado no puede estar vacío`,
            'string.valid': `El estado debe ser 'active', 'inactive' o 'pending'`,
            'any.required': `El estado es un campo requerido`
        })
})

module.exports = {
    userSchemaLogin,
    userSchemaRegister,
    userSchemaUpdateProfile,
    userSchemaUpdatePassword,
    userSchemaUpdateByAdmin
}
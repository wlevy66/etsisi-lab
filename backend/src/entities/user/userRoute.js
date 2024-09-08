const express = require('express')
const router = express.Router()
const UserController = require('./userController')
const validateRequestSchema = require('../../middlewares/validatorSchema')
const UserSchema = require('./userSchema')

//define routes
router.post('/login', validateRequestSchema(UserSchema.userSchemaLogin),UserController.login)
router.post('/register', validateRequestSchema(UserSchema.userSchemaRegister), UserController.register)
router.post('/logout', UserController.logout)
router.get('/verify', UserController.verify)
router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUser)
router.patch('/users/update-profile/:id', validateRequestSchema(UserSchema.userSchemaUpdateProfile), UserController.updateProfile)
router.patch('/users/update-password/:id', validateRequestSchema(UserSchema.userSchemaUpdatePassword), UserController.updatePassword)
router.patch('/users/update-by-admin/:id', validateRequestSchema(UserSchema.userSchemaUpdateByAdmin), UserController.updateByAdmin)

module.exports = router

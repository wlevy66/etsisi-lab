const express = require('express')
const router = express.Router()
const UserController = require('./userController')
const validateMiddleware = require('../../validators/validatorSchema')
const UserSchema = require('./userSchema')

//define routes
router.post('/login', validateMiddleware(UserSchema.userSchemaLogin),UserController.login)
router.post('/register', validateMiddleware(UserSchema.userSchemaRegister), UserController.register)
router.post('/logout', UserController.logout)
router.get('/verify', UserController.verify)
router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUser)
router.patch('/users/update-profile/:id', validateMiddleware(UserSchema.userSchemaUpdateProfile), UserController.updateProfile)
router.patch('/users/update-password/:id', validateMiddleware(UserSchema.userSchemaUpdatePassword), UserController.updatePassword)
router.patch('/users/update-by-admin/:id', validateMiddleware(UserSchema.userSchemaUpdateByAdmin), UserController.updateByAdmin)

module.exports = router

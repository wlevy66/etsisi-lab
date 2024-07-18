const express = require('express')
const router = express.Router()
const UserController = require('./userController')
const validateMiddleware = require('../../middlewares/validatorSchema')
const userSchema = require('./userSchema')

//define routes
router.post('/login', validateMiddleware(userSchema), UserController.login)
router.post('/register', validateMiddleware(userSchema), UserController.register)
router.post('/logout', UserController.logout)
router.get('/verify', UserController.verify)
router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUser)
router.put('/users/:id', UserController.updateUser)

module.exports = router

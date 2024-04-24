const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const validateMiddleware = require('../middlewares/validatorSchema')
const userSchema = require('../schemas/userSchema')

//define routes
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/logout', UserController.logout)
router.get('/verify', UserController.verify)

module.exports = router

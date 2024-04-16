const express = require('express')
const router = express.Router()
const RoomController = require('../controllers/roomController')
const schemaRoom = require('../validators/schemaValidator');


const validateMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }
        next()
    }
}

//define routes
router.get('/rooms', RoomController.get)
router.get('/rooms/:id', RoomController.getById)
router.post('/rooms', validateMiddleware(schemaRoom), RoomController.create)
router.put('/rooms/:id', validateMiddleware(schemaRoom), RoomController.update)
router.delete('/rooms/:id', RoomController.remove)


module.exports = router
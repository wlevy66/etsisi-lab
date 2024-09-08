const express = require('express')
const router = express.Router()
const RoomController = require('./roomController')
const validateMiddleware = require('../../middlewares/validatorSchema')
const roomSchema = require('./roomSchema');

//define routes
router.get('/rooms', RoomController.getRooms)
router.get('/rooms/:id', RoomController.getRoom)
router.post('/rooms', validateMiddleware(roomSchema), RoomController.createRoom)
router.put('/rooms/:id', validateMiddleware(roomSchema), RoomController.updateRoom)
router.delete('/rooms/:id', RoomController.deleteRoom)

module.exports = router
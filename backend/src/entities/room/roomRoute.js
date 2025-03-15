const express = require('express')
const router = express.Router()
const RoomController = require('./roomController')
const validateRequestSchema = require('../../middlewares/validatorSchema')
const roomSchema = require('./roomSchema');

router.get('/rooms', RoomController.getRooms)
router.get('/rooms/:id', RoomController.getRoom)
router.post('/rooms', validateRequestSchema(roomSchema), RoomController.createRoom)
router.put('/rooms/:id', validateRequestSchema(roomSchema), RoomController.updateRoom)
router.delete('/rooms/:id', RoomController.deleteRoom)

module.exports = router
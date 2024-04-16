const express = require('express')
const router = express.Router()
const RoomController = require('../controllers/roomController')
const validateMiddleware = require('../middlewares/validatorSchema')
const roomSchema = require('../schemas/roomSchema');
const validateToken = require('../middlewares/validateToken')



//define routes
router.get('/rooms', RoomController.getRooms)
router.get('/rooms/:id', RoomController.getRoom)
router.post('/rooms', validateMiddleware(roomSchema), RoomController.createRoom)
router.put('/rooms/:id', validateMiddleware(roomSchema), RoomController.updateRoom)
router.delete('/rooms/:id', RoomController.deleteRoom)


module.exports = router
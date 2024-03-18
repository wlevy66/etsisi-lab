const express = require('express')
const router = express.Router()
const RoomController = require('../controllers/roomController')

//define routes
router.get('/rooms', RoomController.get)
router.post('/rooms', RoomController.create)
router.put('/rooms/:id', RoomController.update)
router.delete('/rooms/:id', RoomController.remove)


module.exports = router
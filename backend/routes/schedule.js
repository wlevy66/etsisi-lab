const express = require('express')
const router = express.Router()
const ScheduleController = require('../controllers/scheduleController')
const validateToken = require('../middlewares/validateToken')

//define routes
router.get('/schedules', ScheduleController.get)
router.get('/schedules/:id', ScheduleController.getByRoomId)
router.post('/schedules', ScheduleController.create)
router.put('/schedules/:id', ScheduleController.update)
router.delete('/schedules/:id', ScheduleController.remove)


module.exports = router
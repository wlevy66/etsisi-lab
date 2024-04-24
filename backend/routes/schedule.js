const express = require('express')
const router = express.Router()
const ScheduleController = require('../controllers/scheduleController')
const validateToken = require('../middlewares/validateToken')

//define routes
router.get('/schedules', ScheduleController.getSchedules)
router.get('/schedules/:roomId', ScheduleController.getSchedulesByRoom)
router.get('/schedules/:roomId/:scheduleId', ScheduleController.getSchedule)
router.post('/schedules', ScheduleController.createSchedule)
router.put('/schedules/:id', ScheduleController.updateSchedule)
router.delete('/schedules/:id', ScheduleController.deleteSchedule)


module.exports = router
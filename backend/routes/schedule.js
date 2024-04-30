const express = require('express')
const router = express.Router()
const ScheduleController = require('../controllers/scheduleController')
const validateMiddleware = require('../middlewares/validatorSchema')
const scheduleSchema = require('../schemas/scheduleSchema')

//define routes
router.get('/schedules', ScheduleController.getSchedules)
router.get('/schedules/:roomId', ScheduleController.getSchedulesByRoom)
router.get('/schedules/:roomId/:scheduleId', ScheduleController.getSchedule)
router.post('/schedules', validateMiddleware(scheduleSchema), ScheduleController.createSchedule)
router.put('/schedules/:id', validateMiddleware(scheduleSchema),ScheduleController.updateSchedule)
router.delete('/schedules/:id', ScheduleController.deleteSchedule)


module.exports = router
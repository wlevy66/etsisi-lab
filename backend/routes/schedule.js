const express = require('express')
const router = express.Router()
const ScheduleController = require('../controllers/scheduleController')
const validateMiddleware = require('../middlewares/validatorSchema')
const {schemaScheduleCreate, schemaScheduleUpdate} = require('../schemas/scheduleSchema')

//define routes
router.get('/schedules/available/:userId', ScheduleController.getAvailableSchedules)
router.get('/schedules/:roomId', ScheduleController.getSchedulesByRoom)
router.get('/schedules/:roomId/:scheduleId', ScheduleController.getSchedule)
router.post('/schedules', validateMiddleware(schemaScheduleCreate), ScheduleController.createSchedule)
router.put('/schedules/:id', validateMiddleware(schemaScheduleUpdate),ScheduleController.updateSchedule)
router.delete('/schedules/:id', ScheduleController.deleteSchedule)


module.exports = router
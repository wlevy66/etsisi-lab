const express = require('express')
const router = express.Router()
const ScheduleController = require('./scheduleController')
const validateRequestSchema = require('../../middlewares/validatorSchema')
const {schemaScheduleCreate, schemaScheduleUpdate} = require('./scheduleSchema')

//define routes
router.get('/schedules/users/:scheduleId', ScheduleController.getUsersBySchedule)
router.get('/schedules/available/:userId', ScheduleController.getAvailableSchedules)
router.get('/schedules/:roomId', ScheduleController.getSchedulesByRoom)
router.get('/schedules/:roomId/:scheduleId', ScheduleController.getSchedule)
router.post('/schedules', validateRequestSchema(schemaScheduleCreate), ScheduleController.createSchedule)
router.put('/schedules/:id', validateRequestSchema(schemaScheduleUpdate),ScheduleController.updateSchedule)
router.delete('/schedules/:id', ScheduleController.deleteSchedule)

module.exports = router
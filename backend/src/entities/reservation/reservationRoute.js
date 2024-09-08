const express = require('express')
const router = express.Router()
const ReservationController = require('./reservationController')
const validateRequestSchema = require('../../middlewares/validatorSchema')
const ReservationSchema = require('./reservationSchema')

//define routes for reservations by user
router.get('/reservations/:userId', ReservationController.getReservations)
router.get('/reservations/:userId/:reservationId', ReservationController.getReservation)
router.post('/reservations/:userId', validateRequestSchema(ReservationSchema.reservationSchemaCreate), ReservationController.createReservation)
router.put('/reservations/:userId/:reservationId', validateRequestSchema(ReservationSchema.reservationSchemaUpdate), ReservationController.updateReservation)
router.delete('/reservations/:userId/:reservationId', ReservationController.deleteReservation)

module.exports = router
const express = require('express')
const router = express.Router()
const ReservationController = require('./reservationController')
const validateMiddleware = require('../../validators/validatorSchema')
const {reservationSchemaCreate, reservationSchemaUpdate} = require('./reservationSchema')

//define routes
router.get('/reservations/:userId', ReservationController.getReservations)
router.get('/reservations/:userId/:reservationId', ReservationController.getReservation)
router.post('/reservations', validateMiddleware(reservationSchemaCreate), ReservationController.createReservation)
router.put('/reservations/:reservationId', validateMiddleware(reservationSchemaUpdate), ReservationController.updateReservation)
router.delete('/reservations/:reservationId', ReservationController.deleteReservation)


module.exports = router

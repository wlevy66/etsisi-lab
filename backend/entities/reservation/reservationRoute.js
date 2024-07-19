const express = require('express')
const router = express.Router()
const ReservationController = require('./reservationController')
const validateMiddleware = require('../../middlewares/validatorSchema')
const {reservationSchemaCreate, reservationSchemaUpdate} = require('./reservationSchema')

//define routes
router.get('/reservations/:userId', ReservationController.getReservations)
router.get('/reservations/:userId/:reservationId', ReservationController.getReservation)
router.post('/reservations', validateMiddleware(reservationSchemaCreate), ReservationController.createReservation)
router.put('/reservations/:id', validateMiddleware(reservationSchemaUpdate), ReservationController.updateReservation)
router.delete('/reservations/:id', ReservationController.deleteReservation)


module.exports = router

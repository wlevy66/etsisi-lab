const express = require('express')
const router = express.Router()
const ReservationController = require('../controllers/reservationController')
const validateMiddleware = require('../middlewares/validatorSchema')
const reservationSchema = require('../schemas/reservationSchema')

//define routes
router.get('/reservations/:id', ReservationController.getReservations)
router.get('/reservations/:id/:reservationId', ReservationController.getReservation)
router.post('/reservations', validateMiddleware(reservationSchema), ReservationController.createReservation)
router.put('/reservations/:id', validateMiddleware(reservationSchema), ReservationController.updateReservation)
router.delete('/reservations/:id', ReservationController.deleteReservation)


module.exports = router

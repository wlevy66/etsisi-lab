const express = require('express')
const router = express.Router()
const ReservationController = require('../controllers/reservationController')
const validateToken = require('../middlewares/validateToken')

//define routes
router.get('/reservations/:id', ReservationController.getReservations)
router.get('/reservations/:id/:reservationId', ReservationController.getReservation)
router.post('/reservations', ReservationController.createReservation)
router.put('/reservations/:id', ReservationController.updateReservation)
router.delete('/reservations/:id', ReservationController.deleteReservation)


module.exports = router

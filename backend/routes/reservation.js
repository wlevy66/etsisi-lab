const express = require('express')
const router = express.Router()
const ReservationController = require('../controllers/reservationController')
const validateToken = require('../middlewares/validateToken')

//define routes
router.get('/reservations/:id', ReservationController.get)
router.post('/reservations', ReservationController.create)
router.put('/reservations/:id', ReservationController.update)
router.delete('/reservations/:id', ReservationController.remove)


module.exports = router

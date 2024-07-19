const reservationService = require('./reservationService')

const getReservations = async (req, res) => {
    try{
        const reservations = await reservationService.getReservations(req.params.userId)
        
        return res.status(200).json({
            status: 200,
            reservations
        })
    } catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const getReservation = async (req, res) => {
    try{
        const reservation = await reservationService.getReservation(req.params.reservationId)

        return res.status(200).json({
            status: 200,
            reservation
        })
    } catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const createReservation = async (req, res) => {
    try{
        const {user, schedule} = req.body
        const savedReservation = await reservationService.createReservation(user, schedule)

        res.status(201).json({
            status: 201,
            message: "Reservation created successfully!",
            savedReservation
        })
    } catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const updateReservation = async (req, res) => {
    try{
        const {schedule} = req.body
        const reservationUpdated = await reservationService.updateReservation(req.params.reservationId, schedule)
        
        res.status(201).json({
            status: 201,
            message: "Reservation updated successfully!",
            reservationUpdated
        })

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteReservation = async (req, res) => {
    try {
        const reservation = await reservationService.deleteReservation(req.params.reservationId)
        return res.status(200).json({
            status:200,
            message: "Reservation deleted successfully!",
            reservation
        })
    }catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    getReservations,
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation
}
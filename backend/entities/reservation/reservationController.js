const reservationService = require('./reservationService')

const getReservations = async (req, res) => {
    try{
        const reservations = await reservationService.getReservations(req.params.userId)
        
        res.status(200).json({
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
        if(!reservation) return res.status(404).json({
            status: 404,
            message: 'Reserva no encontrada'
        })

        res.status(200).json({
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
        const {schedule} = req.body
        const savedReservation = await reservationService.createReservation(req.params.userId, schedule)

        res.status(201).json({
            status: 201,
            message: "Reserva creada correctamente!",
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
        const reservationUpdated = await reservationService.updateReservation(req.params, schedule)
        
        res.status(200).json({
            status: 200,
            message: "Reserva actualizada correctamente!",
            reservationUpdated
        })

    } catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteReservation = async (req, res) => {
    try{
        await reservationService.deleteReservation(req.params)
        res.status(200).json({
            status:200,
            message: "Reserva eliminada correctamente!",
        })
    } catch (error) {
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
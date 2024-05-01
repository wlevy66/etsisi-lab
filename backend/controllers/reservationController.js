const Reservation = require('../models/reservationModel')
const Schedule = require('../models/scheduleModel')

const getReservations = async (req, res) => {
    try{
        const reservations = await Reservation.find({"user": req.params.id})
                            .populate({
                                path:'user',
                                select: '_id email'
                            })
                            .populate({
                                path: 'schedule',
                                select: '_id start end room',
                                populate: {
                                    path: 'room',
                                    model: 'Room',
                                    select: 'name capacity'
                                }
                            })

        return res.status(200).json({
            status: 200,
            reservations
        })

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const getReservation = async (req, res) => {
    try{
        const reservation = await Reservation.findById(req.params.reservationId)
                            .populate({
                                path:'user',
                                select: '_id email'
                            })
                            .populate({
                                path: 'schedule',
                                select: '_id start end room',
                                populate: {
                                    path: 'room',
                                    model: 'Room',
                                    select: 'name capacity'
                                }
                            })

        return res.status(200).json({
            status: 200,
            reservation
        })

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const createReservation = async (req, res) => {
    try{
        const {user, schedule} = req.body
        const userHasReservation = await Reservation.find({schedule, user})

        if (userHasReservation.length > 0) return res.status(400).json({
            status: 400,
            error: "You have already a reservation for this schedule."
        })
        const availableCapacity = await updateCapacity(schedule, 'add')
        if(!availableCapacity){
            return res.status(400).json({
                status: 400,
                error: "Not capacity available"
            })
        }
        const newReservation = new Reservation({
            user,
            schedule
        })
        const savedReservation = await newReservation.save()

        res.status(201).json({
            status: 201,
            message: "Reservation created successfully!",
            savedReservation
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const updateReservation = async (req, res) => {
    try{
        
        const currentReservation = await Reservation.findById(req.params.id)
        await updateCapacity(currentReservation.schedule, 'delete')
        const reservationUpdated = await Reservation.findOneAndUpdate(
            { _id: req.params.id },
            { "schedule": req.body._id },
            { new: true }
        )
        await updateCapacity(reservationUpdated.schedule, 'add')
        
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
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({
            message: "Reservation not found"
        })

        await updateCapacity(reservation.schedule, 'delete')
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

const updateCapacity = async (id, type) => {
    try{
        let schedule = await Schedule.findById(id)
        const schedulePopulate = await schedule.populate('room')
        let reservedBy = 0

        if(schedule.reservedBy <= schedulePopulate.room.capacity){
            if(type === 'add')  reservedBy = schedule.reservedBy + 1
            else  reservedBy = schedule.reservedBy - 1
            await Schedule.findByIdAndUpdate(id, {reservedBy}, {new: true})
            return true
        }
        else{
            return false
        }
    }
    catch(e){
        return e.message
    }
}

module.exports = {
    getReservations,
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation
}
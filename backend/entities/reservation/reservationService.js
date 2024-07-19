const Reservation = require('./reservationModel')
const Schedule = require('../schedule/scheduleModel')

const getReservations = async (userId) => {
    try{
        const reservations = await Reservation.find({"user": userId})
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
    } catch(error){
        throw Error(error.message)
    }
}

const getReservation = async (reservationId) => {
    try{
        const reservation = await Reservation.findById(reservationId)
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
    } catch(error){
        throw Error(error.message)
    }
}

const createReservation = async (user, schedule) => {
    try{
        const userHasReservation = await Reservation.find({schedule, user})
        if (userHasReservation.length > 0) throw Error("You have already a reservation for this schedule.")
        
            const availableCapacity = await updateCapacity(schedule, 'add')
        if(!availableCapacity){
            throw Error("Not capacity available")
        }
        
        const newReservation = new Reservation({
            user,
            schedule
        })
        const savedReservation = await newReservation.save()

        return savedReservation
    } catch(error){
        throw Error(error.message)
    }

}

const updateReservation = async (reservationId, schedule) => {
    try{
        const currentReservation = await Reservation.findById(reservationId)
        if(!currentReservation) throw Error("Reservation not found")
        await updateCapacity(currentReservation.schedule, 'delete')
        const reservationUpdated = await Reservation.findOneAndUpdate(
            { _id: reservationId },
            { schedule },
            { new: true }
        )
        await updateCapacity(reservationUpdated.schedule, 'add')
        return reservationUpdated
    } catch(error){
        throw Error(error.message)
    }
}

const deleteReservation = async (reservationId) => {
    try{
        const reservation = await Reservation.findById(reservationId)
        if(!reservation) throw Error("Reservation not found")
    
        await updateCapacity(reservation.schedule, 'delete')
        return await Reservation.findByIdAndDelete(reservationId)
    } catch(error){
        throw Error(error.message)
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
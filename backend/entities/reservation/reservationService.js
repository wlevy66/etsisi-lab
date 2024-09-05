const Reservation = require('./reservationModel')
const Schedule = require('../schedule/scheduleModel')
const User = require('../user/userModel')
const roles = require('../../constans/roles')

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
        return reservations
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
        return reservation
    } catch(error){
        throw Error(error.message)
    }
}

const createReservation = async (user, schedule) => {
    try{
        // Check if user has already a reservation for this schedule
        const userHasReservation = await Reservation.findOne({user, schedule})
        if (userHasReservation) throw Error("Ya tienes una reserva para este horario")

        // Check if there is capacity available
        const availableCapacity = await updateCapacity(schedule, 'create')
        if(!availableCapacity){
            throw Error("No hay capacidad disponible para este horario")
        }

        // Create reservation
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

const updateReservation = async (params, schedule) => {
    try{
        const { userId, reservationId } = params
        const currentReservation = await Reservation.findById(reservationId)
        if(!currentReservation) throw Error("Reserva no encontrada")
        
        const user = await User.findById(userId)
        if(!user) throw Error("Usuario no encontrado")
        
        if (currentReservation.user.toString() !== user._id.toString() && user.role === roles.STUDENT_ROLE) {
            throw Error("No puedes editar una reserva que no te pertenece.")
        }

        await updateCapacity(currentReservation.schedule, 'delete')

        const reservationUpdated = await Reservation.findOneAndUpdate(
            { _id: reservationId },
            { schedule },
            { new: true }
        )
        await updateCapacity(reservationUpdated.schedule, 'create')
        return reservationUpdated
    } catch(error){
        throw Error(error.message)
    }
}

const deleteReservation = async (params) => {
    try{
        const { userId, reservationId } = params
        const reservation = await Reservation.findById(reservationId)
        if(!reservation) throw Error("Reserva no encontrada.")
        
        const user = await User.findById(userId)
        if(!user) throw Error("Usuario no encontrado.")

        if (reservation.user.toString() !== user._id.toString() && user.role === roles.STUDENT_ROLE) {
            throw Error("No puedes eliminar una reserva que no te pertenece.")
        }
        await updateCapacity(reservation.schedule, 'delete')
        return await Reservation.findByIdAndDelete(reservationId)
    } catch(error){
        throw Error(error.message)
    }

}

const updateCapacity = async (id, type) => {
    try{
        let schedule = await Schedule.findById(id)
        if(!schedule) throw Error("Horario no encontrado")
        
        const schedulePopulate = await schedule.populate('room')

        if(type === 'create'){
            if(schedule.reservedBy <= schedulePopulate.room.capacity){
                schedule.reservedBy = schedule.reservedBy + 1
            }
            else{
                throw Error("No hay capacidad disponible para este horario")
            }
        } else if(type === 'delete'){
            if(schedule.reservedBy > 0){
                schedule.reservedBy = schedule.reservedBy - 1
            }
            else{
                throw Error("No hay capacidad disponible para este horario")
            }
        }
        else{
            return false
        }

        await Schedule.findByIdAndUpdate(id, {reservedBy: schedule.reservedBy}, {new: true})
        return true
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
const Schedule = require('./scheduleModel')
const Reservation = require('../reservation/reservationModel')

const getSchedulesByRoom = async (roomId) => {
    try{
        return await Schedule.find({ room: roomId}).populate('room').sort({start: 1})
    } catch(error){
        throw new Error(error)
    }
}

const getSchedule = async (scheduleId) => {
    try{
        const schedule = await Schedule.findById(scheduleId).populate('room')
        if (!schedule) throw new Error('Horario no encontrado')
        return schedule
    } catch(error){
        throw new Error(error)
    }
}

const getAvailableSchedules = async (userId) => {
    try{
        const reservations = await Reservation.find({ "user":userId })
        const schedules = await Schedule.find().populate('room')
        const availableSchedules = schedules.filter(schedule => {
            return !reservations.some(reservation => {
                return reservation.schedule.toString() === schedule._id.toString()
            })
        })
        return availableSchedules
    } catch(error){
        throw new Error(error)
    }
}

const createSchedule = async (schedule) => {
    try{
        const isValid = await validateSchedule(schedule)
        if (!isValid) throw new Error('El horario ya existe o se cruza con otro horario')
        const newSchedule = new Schedule(schedule)
        const savedSchedule = await newSchedule.save()
        return savedSchedule
    } catch(error){
        throw new Error(error)
    }
}

const validateSchedule = async (schedule) => {
    const { room, start:newStart, end:newEnd } = schedule

    const existingSchedule = await Schedule.findOne({
        room,
        $or: [
            {
                start: { $lt: newEnd },
                end: { $gt: newStart }
            },
            {
                start: {
                    $gte: newStart, 
                    $lt: newEnd 
                }
            },
            {
                end: { 
                    $gt: newStart,
                    $lte: newEnd
                }
            }
        ]
    })
    return !existingSchedule
}


const updateSchedule = async (id, schedule) => {
    try{
        const isValid = await validateSchedule(schedule)
        if (!isValid) throw new Error('El horario ya existe o se cruza con otro horario')
            
        const scheduleUpdated = await Schedule.findByIdAndUpdate(id, schedule, {new: true})
        if (!scheduleUpdated) throw new Error('Horario no encontrado')
        return scheduleUpdated
    } catch(error){
        throw new Error(error.message)
    }
}

const deleteSchedule = async (id) => {
    try{
        const schedule = await Schedule.findById(id)
        if (!schedule) throw new Error('Horario no encontrado')

        await deleteScheduleInReservation(id)
        return await Schedule.findByIdAndDelete(id)
    }
    catch(error){
        throw new Error(error.message)
    }
}

const getUsersBySchedule = async (scheduleId) => {
    try{
        return await Reservation.find({ schedule: scheduleId}).populate('user')
    } catch(error){
        throw new Error(error)
    }
}

const deleteScheduleInReservation = async (id) => {
    try {
        await Reservation.deleteMany({ schedule : id})
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getSchedulesByRoom,
    getSchedule,
    getAvailableSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getUsersBySchedule
}
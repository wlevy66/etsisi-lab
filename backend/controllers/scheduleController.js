const Schedule = require('../models/scheduleModel')
const Reservation = require('../models/reservationModel')

const getSchedulesByRoom = async (req, res) => {
    try{
        const schedules = await Schedule.find({ room : req.params.roomId}).populate('room').sort({start: 1})
        res.status(200).json({
            status: 200,
            schedules
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const getSchedule = async (req, res) => {
    try{
        const schedule = await Schedule.findById(req.params.scheduleId).populate('room')
        res.status(200).json({
            status: 200,
            schedule,
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const getAvailableSchedules = async (req, res) => {
    try{
        const reservations = await Reservation.find({ "user":req.params.userId })
        const schedules = await Schedule.find().populate('room')
        const availableSchedules = schedules.filter(schedule => {
            return !reservations.some(reservation => {
                return reservation.schedule.toString() === schedule._id.toString()
            })
        })
        res.status(200).json({
            status: 200,
            availableSchedules
        })
    }
    catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const createSchedule = async (req, res) => {

    try{

        const newSchedule = new Schedule(req.body)
        const savedSchedule = await newSchedule.save()
        
        res.status(201).json({
            status: 201,
            message: 'Schedule created successfully!',
            savedSchedule
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const updateSchedule = async (req, res) => {
    try{
        const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!schedule) return res.status(404).json({
            status: 404,
            error: 'Schedule not found'
        })
        res.status(200).json({
            status: 200,
            message: 'Schedule updated successfully!',
            schedule
        })

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteSchedule = async (req, res) => {
    try{
        const schedule = await Schedule.findByIdAndDelete(req.params.id)
        if(!schedule) return res.status(404).json({
            status: 404,
            error: 'Schedule not found'
        })
        await deleteScheduleInReservation(req.params.id)
        res.status(204).json({
            status: 204,
            message: 'Schedule deleted successfully!'
        })
    }
    catch(error){
        res.status(500).json({
            error: error.message
        })
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
    deleteSchedule
}
const scheduleService = require('./scheduleService')

const getSchedulesByRoom = async (req, res) => {
    try {
        const schedules = await scheduleService.getSchedulesByRoom(req.params.roomId)
        res.status(200).json({
            status: 200,
            schedules
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getSchedule = async (req, res) => {
    try {
        const schedule = await scheduleService.getSchedule(req.params.scheduleId)
        if (!schedule) return res.status(404).json({
            status: 404,
            message: 'Horario no encontrado'
        })

        res.status(200).json({
            status: 200,
            schedule,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getAvailableSchedules = async (req, res) => {
    try {
        const availableSchedules = await scheduleService.getAvailableSchedules(req.params.userId)
        res.status(200).json({
            status: 200,
            availableSchedules
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const createSchedule = async (req, res) => {
    try {
        const savedSchedule = await scheduleService.createSchedule(req.body)

        res.status(201).json({
            status: 201,
            message: 'Horario creado correctamente!',
            savedSchedule
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateSchedule = async (req, res) => {
    try {
        const schedule = await scheduleService.updateSchedule(req.params.id, req.body)
        res.status(200).json({
            status: 200,
            message: 'Horario actualizado correctamente!',
            schedule
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteSchedule = async (req, res) => {
    try {
        await scheduleService.deleteSchedule(req.params.id)
        res.status(204).json({
            status: 204,
            message: 'Horario eliminado correctamente!',
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getUsersBySchedule = async (req, res) => {
    try {
        const users = await scheduleService.getUsersBySchedule(req.params.scheduleId)
        res.status(200).json({
            status: 200,
            users
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
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
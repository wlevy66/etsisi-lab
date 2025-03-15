const Room = require('./roomModel')
const Schedule = require('../schedule/scheduleModel')

const getRooms = async () => {
    try {
        return await Room.find().select('_id name capacity')
    } catch (error) {
        throw new Error(error.message)
    }
}

const getRoom = async (id) => {
    try {
        return await Room.findById(id).select('_id name capacity')
    } catch (error) {
        throw new Error(error.message)
    }
}

const createRoom = async (name, capacity) => {
    try {
        const nameTrimmed = name.trim();
        const roomAlreadyExists = await Room.findOne({ "name": nameTrimmed });
        if (roomAlreadyExists) {
            throw new Error('La aula ya existe');
        }

        const newRoom = new Room({
            name: nameTrimmed,
            capacity
        });

        return await newRoom.save();
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateRoom = async (id, room) => {
    try {
        const schedules = await Schedule.find({ room: id })
        schedules.forEach(schedule => {
            if (schedule.reservedBy > room.capacity) {
                throw new Error('La capacidad del aula no puede ser menor a la cantidad de reservas')
            }
        })
        return await Room.findByIdAndUpdate(id, room, { new: true })
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteRoom = async (id) => {
    try {
        const room = await Room.findById(id)
        if (!room) {
            throw new Error('Aula no encontrada')
        }
        await deleteRoomInSchedule(id)
        await deleteRoomInReservation(id)
        return await Room.findByIdAndDelete(id)
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteRoomInSchedule = async (id) => {
    try {
        await Schedule.deleteMany({ room: id })
    } catch (error) {
        return error.message
    }
}
const deleteRoomInReservation = async (id) => {
    try {
        await Reservation.deleteMany({ room: id })
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
}
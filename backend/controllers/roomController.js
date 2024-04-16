const Room = require('../models/roomModel')
const Schedule = require ('../models/scheduleModel')
const Reservation = require ('../models/reservationModel')

const getRooms = async (req, res) => {
    try{
        const rooms = await Room.find().select('_id name capacity')
        res.status(200).json({
            status: 200,
            rooms
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const getRoom = async (req, res) => {
    try{
        const room = await Room.findById(req.params.id).select('_id name capacity')
        if(!room) return res.status(404).json({
            status: 404,
            message: 'Room not found'
        })

        res.status(200).json({
            status: 200,
            room
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const createRoom = async (req, res) => {
    try{
        const {name, capacity} = req.body
      
        const roomAlreadyExists = await Room.findOne({"name":name})
        if(!roomAlreadyExists) return res.status(400).json({
            status: 400,
            error: 'Room already exists',
        })
        
        const newRoom = new Room({
            name,
            capacity
        })
        const savedRoom = await newRoom.save()
        res.status(201).json({
            status: 201,
            message: 'Room created successfully!',
            savedRoom
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const updateRoom = async (req, res) => {
    try{
        await Room.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(roomUpdated => {
            res.status(201).json({
                status: 201,
                message: 'Room updated successfully!',
                roomUpdated
            })
        })
        .catch(() => {
            return res.status(404).json({
                status: 404,
                error: 'Room already exists'
            })
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return res.status(404).json({
            error: "Room not found"
        })

        await removeRoomInSchedule(req.params.id)
        await removeRoomInReservation(req.params.id)
        res.status(204).json({
            status:204
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
const removeRoomInSchedule = async (id) => {
    try {
        await Schedule.deleteMany({ room : id})
    }catch (error) {
        return error.message
    }
}
const removeRoomInReservation = async (id) => {
    try {
        await Reservation.deleteMany({ room : id})
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
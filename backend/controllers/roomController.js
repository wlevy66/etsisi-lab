const Room = require('../models/roomModel')
const Schedule = require ('../models/scheduleModel')
const Reservation = require ('../models/reservationModel')

const get = async (req, res) => {
    try{
        const {id} = req.body
        const rooms = await Room.find().select('_id name capacity')
        res.json({
            rooms
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const getById = async (req, res) => {
    try{
        const room = await Room.findById(req.params.id).select('_id name capacity')
        res.json({
            room
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const create = async (req, res) => {
    try{
        const {name, capacity} = req.body
      
        const roomAlreadyExists = await Room.find({"name":name})
        if(roomAlreadyExists.length > 0) return res.status(400).json({
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
            message: error.message
        })
    }
}

const update = async (req, res) => {
    try{
        const {name, capacity} = req.body

        if(!name || !capacity) return res.status(500).json({
            status: 500,
            message: 'Missing inputs'
        })

        const room = await Room.findById(req.params.id);
        if(name !== room.name) {
            const roomAlreadyExists = await Room.find({"name":name})
            if(roomAlreadyExists.length > 0) return res.status(500).json({
                status: 500,
                message: 'Room already exists',
            })
        }

        if (name !== room.name || capacity !== room.capacity) {
            const roomUpdated = await Room.findOneAndUpdate(
                { _id: req.params.id },
                { name, capacity},
                { new: true }
            );
            
            res.status(201).json({
                status: 201,
                message: 'Room updated successfully!',
                roomUpdated
            })
        }



    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const remove = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return res.status(404).json({ message: "Room not found" });
        removeRoomInSchedule(req.params.id)
        removeRoomInReservation(req.params.id)
        return res.json(room);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const removeRoomInSchedule = async (id) => {
    try {
        const schedule = await Schedule.deleteMany({ room : id})
        return schedule
    }catch (error) {
        return error.message
    }
}
const removeRoomInReservation = async (id) => {
    try {
        const reservation = await Reservation.deleteMany({ room : id})
        return reservation
    } catch (error) {
        return error.message
    }
}

module.exports = {
    get,
    getById,
    create,
    update,
    remove
}
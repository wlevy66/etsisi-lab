const Room = require('../models/roomModel')
const Schedule = require ('../models/scheduleModel')
const get = async (req, res) => {
    try{
        const {id} = req.body
        const rooms = await Room.find()
        res.json({
            rooms
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const create = async (req, res) => {
    try{
        console.log(req.body)
        const {name, capacity} = req.body
        
        const newRoom = new Room({
            name,
            capacity
        })

        const savedRoom = await newRoom.save()
        
        res.status(200).json({
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
        const roomUpdated = await Room.findOneAndUpdate(
            { _id: req.params.id },
            { name, capacity},
            { new: true }
        );
        
        res.status(200).json({
            roomUpdated
        })

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
        return res.json(room);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const removeRoomInSchedule = async (id) => {
    try {
        const schedule = await Schedule.deleteMany({ room : id});
        return schedule
    }catch (error) {
        return error.message
    }
}

module.exports = {
    get,
    create,
    update,
    remove
}
const Schedule = require('../models/scheduleModel')

const get = async (req, res) => {
    try{
        const schedules = await Schedule.find().populate('room')
        res.json({
            schedules
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const getByRoomId = async (req, res) => {
    try{
        const id = req.params.id
        const schedules = await Schedule.find({ room : id}).populate('room')
        res.json({
            schedules,
            message: 'getById'
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const create = async (req, res) => {

    try{
        const {room, start, end} = req.body
        const newSchedule = new Schedule({
            room,
            start,
            end
        })
        const savedSchedule = await newSchedule.save()
        
        res.status(200).json({
            savedSchedule
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const update = async (req, res) => {
    try{
        const {room, start, end} = req.body
        const scheduleUpdated = await Schedule.findOneAndUpdate(
            { _id: req.params.id },
            { room, start, end },
            { new: true }
        );
        
        res.status(200).json({
            scheduleUpdated
        })

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const remove = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!schedule) return res.status(404).json({ message: "Schedule not found" });
        return res.json(schedule);
    }catch (error) {
        return res.status(500).json({ message: error.message });
    }
}





module.exports = {
    get,
    getByRoomId,
    create,
    update,
    remove
}
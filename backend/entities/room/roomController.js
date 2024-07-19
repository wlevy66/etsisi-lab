const roomService = require('./roomService')

const getRooms = async (req, res) => {
    try{
        const rooms = await roomService.getRooms()
        res.status(200).json({
            status: 200,
            rooms
        })
    } catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const getRoom = async (req, res) => {
    try{
        const room = await roomService.getRoom(req.params.id)
        if(!room) return res.status(404).json({
            status: 404,
            message: 'Room not found'
        })

        res.status(200).json({
            status: 200,
            room
        })
    } catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const createRoom = async (req, res) => {
    try {
        const { name, capacity } = req.body;
        const savedRoom = await roomService.createRoom(name, capacity);
        res.status(201).json({
            status: 201,
            message: 'Room created successfully!',
            savedRoom
        })
    } catch (error) {
        if (error.message === 'Room already exists') {
            return res.status(400).json({
                status: 400,
                error: error.message
            })
        }
        res.status(500).json({
            error: error.message
        })
    }
}

const updateRoom = async (req, res) => {
    try{
        await roomService.updateRoom(req.params.id, req.body)
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
        await roomService.deleteRoom(req.params.id)
        res.status(204).json({
            status:204,
            message: 'Room deleted successfully!'
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
}
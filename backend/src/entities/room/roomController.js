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
            message: 'Aula no encontrada'
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
            message: 'Aula creada correctamente!',
            savedRoom
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateRoom = async (req, res) => {
    try{
        const roomUpdated = await roomService.updateRoom(req.params.id, req.body)
        res.status(200).json({
            status: 200,
            message: 'Aula actualizada correctamente!',
            roomUpdated
        })
    } catch(error){
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
            message: 'Aula eliminada correctamente!'
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
import axios from '@/api/axios'

const getRoomsRequest = () => axios.get('/room/rooms')
const getRoomRequest = (id) => axios.get(`/room/rooms/${id}`)
const createRoomRequest = (room) => axios.post('/room/rooms', room)
const updateRoomRequest = (id, updatedRoom) => axios.put(`/room/rooms/${id}`, updatedRoom)
const deleteRoomRequest = (id) => axios.delete(`/room/rooms/${id}`)

const roomApi = {
    getRoomsRequest,
    getRoomRequest,
    createRoomRequest,
    updateRoomRequest,
    deleteRoomRequest
}

export default roomApi
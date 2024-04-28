import axios from './axios'

const getRoomsRequest = () => axios.get('/room/rooms')
const createRoomRequest = (room) => axios.post('/room/rooms', room)
const updateRoomRequest = (id, newData) => axios.put(`/room/rooms/${id}`, newData)
const deleteRoomRequest = (id) => axios.delete(`/room/rooms/${id}`)
const getRoomRequest = (id) => axios.get(`/room/rooms/${id}`)

export {
    getRoomsRequest,
    createRoomRequest,
    updateRoomRequest,
    deleteRoomRequest,
    getRoomRequest
}
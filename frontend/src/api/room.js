import axiosInstance from '@/api/axios'

const getRoomsRequest = () => axiosInstance.get('/room/rooms')
const getRoomRequest = (id) => axiosInstance.get(`/room/rooms/${id}`)
const createRoomRequest = (room) => axiosInstance.post('/room/rooms', room)
const updateRoomRequest = (id, updatedRoom) => axiosInstance.put(`/room/rooms/${id}`, updatedRoom)
const deleteRoomRequest = (id) => axiosInstance.delete(`/room/rooms/${id}`)

const roomApi = {
    getRoomsRequest,
    getRoomRequest,
    createRoomRequest,
    updateRoomRequest,
    deleteRoomRequest
}

export default roomApi
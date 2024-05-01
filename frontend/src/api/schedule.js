import axios from './axios'

const getSchedulesRequest = () => axios.get('/schedule/schedules')
const getAvailableSchedulesRequest = (userId) => axios.get(`/schedule/schedules/available/${userId}`)
const getSchedulesByRoomRequest = (roomId) => axios.get(`/schedule/schedules/${roomId}`)
const createScheduleRequest = (schedule) => axios.post('/schedule/schedules', schedule)
const updateScheduleRequest = (id, newData) => axios.put(`/schedule/schedules/${id}`, newData)
const deleteScheduleRequest = (id) => axios.delete(`/schedule/schedules/${id}`)
const getScheduleRequest = (roomId, scheduleId) => axios.get(`/schedule/schedules/${roomId}/${scheduleId}`)


export {
    getSchedulesRequest,
    getSchedulesByRoomRequest,
    createScheduleRequest,
    updateScheduleRequest,
    deleteScheduleRequest,
    getScheduleRequest,
    getAvailableSchedulesRequest
}
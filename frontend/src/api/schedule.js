import axios from './axios'

const getAvailableSchedulesRequest = (userId) => axios.get(`/schedule/schedules/available/${userId}`)
const getSchedulesByRoomRequest = (roomId) => axios.get(`/schedule/schedules/${roomId}`)
const createScheduleRequest = (schedule) => axios.post('/schedule/schedules', schedule)
const updateScheduleRequest = (id, newData) => axios.put(`/schedule/schedules/${id}`, newData)
const deleteScheduleRequest = (id) => axios.delete(`/schedule/schedules/${id}`)
const getScheduleRequest = (roomId, scheduleId) => axios.get(`/schedule/schedules/${roomId}/${scheduleId}`)
const getUsersByScheduleRequest = (scheduleId) => axios.get(`/schedule/schedules/users/${scheduleId}`)

export {
    getSchedulesByRoomRequest,
    createScheduleRequest,
    updateScheduleRequest,
    deleteScheduleRequest,
    getScheduleRequest,
    getAvailableSchedulesRequest,
    getUsersByScheduleRequest
}
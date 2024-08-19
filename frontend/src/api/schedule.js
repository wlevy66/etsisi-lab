import axios from '@/api/axios'

const getSchedulesByRoomRequest = (roomId) => axios.get(`/schedule/schedules/${roomId}`)
const getScheduleRequest = (roomId, scheduleId) => axios.get(`/schedule/schedules/${roomId}/${scheduleId}`)
const getAvailableSchedulesRequest = (userId) => axios.get(`/schedule/schedules/available/${userId}`)
const createScheduleRequest = (schedule) => axios.post('/schedule/schedules', schedule)
const updateScheduleRequest = (id, updatedSchedule) => axios.put(`/schedule/schedules/${id}`, updatedSchedule)
const deleteScheduleRequest = (id) => axios.delete(`/schedule/schedules/${id}`)
const getUsersByScheduleRequest = (scheduleId) => axios.get(`/schedule/schedules/users/${scheduleId}`)

const scheduleApi = {
    getSchedulesByRoomRequest,
    getScheduleRequest,
    getAvailableSchedulesRequest,
    createScheduleRequest,
    updateScheduleRequest,
    deleteScheduleRequest,
    getUsersByScheduleRequest
}

export default scheduleApi
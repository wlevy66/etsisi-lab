import axiosInstance from '@/api/axios'

const getSchedulesByRoomRequest = (roomId) => axiosInstance.get(`/schedule/schedules/${roomId}`)
const getScheduleRequest = (roomId, scheduleId) => axiosInstance.get(`/schedule/schedules/${roomId}/${scheduleId}`)
const getAvailableSchedulesRequest = (userId) => axiosInstance.get(`/schedule/schedules/available/${userId}`)
const createScheduleRequest = (schedule) => axiosInstance.post('/schedule/schedules', schedule)
const updateScheduleRequest = (id, updatedSchedule) => axiosInstance.put(`/schedule/schedules/${id}`, updatedSchedule)
const deleteScheduleRequest = (id) => axiosInstance.delete(`/schedule/schedules/${id}`)
const getUsersByScheduleRequest = (scheduleId) => axiosInstance.get(`/schedule/schedules/users/${scheduleId}`)

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
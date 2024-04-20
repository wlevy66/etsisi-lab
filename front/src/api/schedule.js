import axios from './axios'

const getSchedulesRequest = () => axios.get('/schedule/schedules')
const createScheduleRequest = (schedule) => axios.post('/schedule/schedules', schedule)
const updateScheduleRequest = (id, newData) => axios.put(`/schedule/schedules/${id}`, newData)
const deleteScheduleRequest = (id) => axios.delete(`/schedule/schedules/${id}`)
const getScheduleRequest = (id) => axios.get(`/schedule/schedules/${id}`)

export {
    getSchedulesRequest,
    createScheduleRequest,
    updateScheduleRequest,
    deleteScheduleRequest,
    getScheduleRequest
}
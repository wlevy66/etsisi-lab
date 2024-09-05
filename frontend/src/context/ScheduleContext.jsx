import scheduleApi from '@/api/schedule'
import { createContext, useContext, useState } from 'react'

export const ScheduleContext = createContext()

export const useSchedule = () => {
    const context = useContext(ScheduleContext)
    if (!context) throw new Error('Missing ScheduleContext')
    return context
}

export const ScheduleProvider = ({ children }) => {

    const [schedules, setSchedules] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const getAvailableSchedules = async (id) => {
        try {
            const response = await scheduleApi.getAvailableSchedulesRequest(id)
            setSchedules(response.data.availableSchedules)
        }
        catch (error) {
            setError(error.response.data.error)
        }
    }

    const getSchedulesByRoom = async (roomId) => {
        try {
            const response = await scheduleApi.getSchedulesByRoomRequest(roomId)
            setSchedules(response.data.schedules)
        }
        catch (error) {
            setError(error.response.data.error)
        }
    }

    const getSchedule = async (roomId, scheduleId) => {
        try {
            const response = await scheduleApi.getScheduleRequest(roomId, scheduleId)
            return response.data.schedule
        }
        catch (error) {
            setError(error.response.data.error)
        }
    }

    const createSchedule = async (schedule) => {
        try {
            const response = await scheduleApi.createScheduleRequest(schedule)
            setSuccess(response.data.message)
        }
        catch (error) {
            setError(error.response.data.error)
        }
    }

    const updateSchedule = async (id, updatedSchedule) => {
        try {
            const response = await scheduleApi.updateScheduleRequest(id, updatedSchedule)
            setSuccess(response.data.message)
        }
        catch (error) {
            setError(error.response.data.error)
        }
    }

    const deleteSchedule = async (id) => {
        try {
            await scheduleApi.deleteScheduleRequest(id)
            setSchedules(schedules.filter(schedule => schedule._id !== id))
        }
        catch (error) {
            setError(error.response.data.error)
        }
    }

    const getUsersBySchedule = async (scheduleId) => {
        try {
            const response = await scheduleApi.getUsersByScheduleRequest(scheduleId)
            return response.data.users
        }
        catch (error) {
            setError(error.response.data.error)
        }
    }

    return (
        <ScheduleContext.Provider value={{
            getSchedulesByRoom,
            getSchedule,
            getAvailableSchedules,
            createSchedule,
            updateSchedule,
            deleteSchedule,
            getUsersBySchedule,
            schedules,
            error,
            setError,
            success,
            setSuccess
        }}>
            {children}
        </ScheduleContext.Provider>
    )
}
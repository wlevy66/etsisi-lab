import { createContext, useContext, useState } from 'react'
import { getSchedulesByRoomRequest, createScheduleRequest, updateScheduleRequest, deleteScheduleRequest, getScheduleRequest, getAvailableSchedulesRequest, getUsersByScheduleRequest } from '@/api/schedule'


export const ScheduleContext = createContext()

export const useSchedule = () => {
    const context = useContext(ScheduleContext)
    if(!context) throw new Error('Missing ScheduleContext')
    return context
}

export const ScheduleProvider = ({ children }) => {

    const [schedules, setSchedules] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const getAvailableSchedules = async (id) => {
        try{
            const response = await getAvailableSchedulesRequest(id)
            setSchedules(response.data.availableSchedules)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const getSchedulesByRoom = async (roomId) => {
        try{
            const response = await getSchedulesByRoomRequest(roomId)
            setSchedules(response.data.schedules)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const getSchedule = async (roomId, scheduleId) => {
        try{
            const response = await getScheduleRequest(roomId, scheduleId)
            return response.data.schedule
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const addSchedule = async (schedule) => {
        try{
            await createScheduleRequest(schedule)
            setSuccess(true)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const updateSchedule = async (id, newData) => {
        try{
            await updateScheduleRequest(id, newData)
            setSuccess(true)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const deleteSchedule = async (id) => {
        try{
            await deleteScheduleRequest(id)
            setSchedules(schedules.filter(schedule => schedule._id !== id))
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const getUsersBySchedule = async (scheduleId) => {
        try{
            const response = await getUsersByScheduleRequest(scheduleId)
            return response.data.users
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    return (
        <ScheduleContext.Provider value={{
            schedules,
            error,
            success,
            getSchedulesByRoom,
            addSchedule,
            updateSchedule,
            deleteSchedule,
            getSchedule,
            setError,
            setSuccess,
            getAvailableSchedules,
            getUsersBySchedule
        }}>
            {children}
        </ScheduleContext.Provider>
    )
}
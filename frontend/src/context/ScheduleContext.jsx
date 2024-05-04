import { createContext, useContext, useState } from 'react'
import { getSchedulesByRoomRequest, createScheduleRequest, updateScheduleRequest, deleteScheduleRequest, getScheduleRequest, getAvailableSchedulesRequest } from '@/api/schedule'


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
        catch(e){
            console.log(e)
        }
    }

    const getSchedulesByRoom = async (roomId) => {
        try{
            const response = await getSchedulesByRoomRequest(roomId)
            setSchedules(response.data.schedules)
        }
        catch(e){
            console.log(e)
        }
    }

    const getSchedule = async (roomId, scheduleId) => {
        try{
            const response = await getScheduleRequest(roomId, scheduleId)
            return response.data.schedule
        }
        catch(e){
            console.log(e)
        }
    }

    const addSchedule = async (schedule) => {
        try{
            await createScheduleRequest(schedule)
            setSuccess(true)
        }
        catch(e){
            console.log(e)
            setError(e.response.data.error)
        }
    }

    const updateSchedule = async (id, newData) => {
        try{
            await updateScheduleRequest(id, newData)
            setSuccess(true)
        }
        catch(e){
            setError(e.response.data.error)
        }
    }

    const deleteSchedule = async (id) => {
        try{
            await deleteScheduleRequest(id)
            setSchedules(schedules.filter(schedule => schedule._id !== id))
        }
        catch(e){
            console.log(e)
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
            getAvailableSchedules
        }}>
            {children}
        </ScheduleContext.Provider>
    )
}
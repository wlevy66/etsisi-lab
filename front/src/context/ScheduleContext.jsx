import { createContext, useContext, useState } from 'react'
import { getSchedulesRequest, getSchedulesByRoomRequest, createScheduleRequest, updateScheduleRequest, deleteScheduleRequest, getScheduleRequest } from '../api/schedule'


export const ScheduleContext = createContext()

export const useSchedule = () => {
    const context = useContext(ScheduleContext)
    if(!context) throw new Error('Missing ScheduleContext')
    return context
}

export const ScheduleProvider = ({ children }) => {

    const [schedules, setSchedules] = useState([])
    const [error, setError] = useState(null)

    const getSchedules = async () => {
        try{
            const response = await getSchedulesRequest()
            setSchedules(response.data.schedules)
        }
        catch(error){
            console.log(error)
        }
    }

    const getSchedulesByRoom = async (roomId) => {
        try{
            const response = await getSchedulesByRoomRequest(roomId)
            setSchedules(response.data.schedules)
        }
        catch(error){
            console.log(error)
        }
    }

    const addSchedule = async (schedule) => {
        try{
            const response = await createScheduleRequest(schedule)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const updateSchedule = async (id, newData) => {
        try{
            const response = await updateScheduleRequest(id, newData)
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
            console.log(error)
        }
    }

    const getSchedule = async (roomId, scheduleId) => {
        try{
            const response = await getScheduleRequest(roomId, scheduleId)
            return response.data.schedule
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <ScheduleContext.Provider value={{
            schedules,
            error,
            getSchedules,
            getSchedulesByRoom,
            addSchedule,
            updateSchedule,
            deleteSchedule,
            getSchedule
        }}>
            {children}
        </ScheduleContext.Provider>
    )
}
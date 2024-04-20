import { createContext, useContext, useState } from 'react'
import { getSchedulesRequest, createScheduleRequest, updateScheduleRequest, deleteScheduleRequest, getScheduleRequest } from '../api/schedule'


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
            console.log(response.data.schedules)
            setSchedules(response.data.schedules)
        }
        catch(error){
            console.log(error)
        }
    }

    const addSchedule = async (schedule) => {
        try{
            const response = await createScheduleRequest(schedule)
            console.log(response.data.message)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const updateSchedule = async (id, newData) => {
        try{
            const response = await updateScheduleRequest(id, newData)
            console.log(response.data.message)
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

    const getSchedule = async (id) => {
        try{
            const response = await getScheduleRequest(id)
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
            addSchedule,
            updateSchedule,
            deleteSchedule,
            getSchedule
        }}>
            {children}
        </ScheduleContext.Provider>
    )
}
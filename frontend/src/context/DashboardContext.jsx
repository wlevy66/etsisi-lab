import {createContext, useContext, useState} from "react";
import {createRoomRequest, deleteRoomRequest, getRoomsRequest} from "../api/room.js";
import {createScheduleRequest, deleteScheduleRequest, getSchedulesRequest} from "../api/schedule.js";

const DashboardContext = createContext()

export const useDashboard = () => {
    const context = useContext(DashboardContext)
    if(!context) throw new Error('Missing DashboardProvider')

    return context
}

export function DashboardProvider({children}){

    const [rooms, setRooms] = useState([])
    const [schedules, setSchedules] = useState([])

    const createRoom = async (room) => {
        const response = await createRoomRequest(room)
        console.log(response)
    }

    const getRooms = async () => {
        const response = await getRoomsRequest()
        setRooms(response)
        console.log(response)
    }

    const deleteRoom = async (id) => {
        const response = await deleteRoomRequest(id)
        const newRooms = rooms.filter(room => room._id !== id)
        setRooms(newRooms)
        console.log(response)
    }

    const createSchedule = async (schedule) => {
        const response = await createScheduleRequest(schedule)
        console.log(response)
    }
    const getSchedules = async () => {
        const response = await getSchedulesRequest()
        setSchedules(response)
        console.log(response)
    }
    const deleteSchedule = async (id) => {
        const response = await deleteScheduleRequest(id)
        const newSchedules = schedules.filter(schedules => schedules._id !== id)
        setSchedules(newSchedules)
        console.log(response)
    }

    return (
        <DashboardContext.Provider
            value={{
                rooms,
                schedules,
                getRooms,
                createRoom,
                deleteRoom,
                getSchedules,
                createSchedule,
                deleteSchedule,
            }}>
            {children}
        </DashboardContext.Provider>
    )
}
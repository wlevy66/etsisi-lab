import {createContext, useContext, useState} from "react";
import {createRoomRequest, deleteRoomRequest, getRoomsRequest, updateRoomRequest} from "../api/room.js";
import {createScheduleRequest, deleteScheduleRequest, getSchedulesRequest, updateScheduleRequest, getScheduleByRoomIdRequest} from "../api/schedule.js";

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
    }

    const getRooms = async () => {
        const response = await getRoomsRequest()
        setRooms(response)
    }

    const updateRoom = async (id, newData) => {
        const response = await updateRoomRequest(id, newData)
    }
    const deleteRoom = async (id) => {
        const response = await deleteRoomRequest(id)
        const newRooms = rooms.filter(room => room._id !== id)  
        setRooms(newRooms)
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
    const getScheduleByRoomId = async(id) => {
        const response = await getScheduleByRoomIdRequest(id)
        setSchedules(response)
        console.log(response)
    }
    const updateSchedule = async (id, newData) => {
        const response = await updateScheduleRequest(id, newData)
    }
    const deleteSchedule = async (id) => {
        const response = await deleteScheduleRequest(id)
        const newSchedules = schedules.filter(schedules => schedules._id !== id)
        setSchedules(newSchedules)
    }

    return (
        <DashboardContext.Provider
            value={{
                rooms,
                schedules,
                getRooms,
                createRoom,
                updateRoom,
                deleteRoom,
                getSchedules,
                getScheduleByRoomId,
                createSchedule,
                updateSchedule,
                deleteSchedule
            }}>
            {children}
        </DashboardContext.Provider>
    )
}
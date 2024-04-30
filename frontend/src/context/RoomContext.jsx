import { createContext, useContext, useState } from "react";
import { getRoomsRequest, deleteRoomRequest, createRoomRequest, updateRoomRequest, getRoomRequest } from "@/api/room"

const RoomContext = createContext()

export const useRoom = () => {
    const context = useContext(RoomContext)
    if(!context) throw new Error('Missing RoomContext')
    return context
}

export const RoomProvider = ({ children }) => {

    const [rooms, setRooms] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const getRooms = async () => {
        try{
            const response = await getRoomsRequest()
            setRooms(response.data.rooms)
        }
        catch(e){
            console.log(e)
        }
    }
    
    const getRoom = async (id) => {
        try{
            const response = await getRoomRequest(id)
            return response.data.room
        }
        catch(e){
            console.log(e)
        }
    }

    const addRoom = async (room) => {
        try{
            await createRoomRequest(room)
            setSuccess(true)
        }
        catch(e){
            setError(e.response.data.error)
            console.log(e)
        }
    }

    const updateRoom = async (id, newData) => {
        try{
            await updateRoomRequest(id, newData)
            setSuccess(true)
        }
        catch(e){
            setError(e.response.data.error)
        }
    }

    const deleteRoom = async (id) => {
        try{
            await deleteRoomRequest(id)
            setRooms(rooms.filter(room => room._id !== id))
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <RoomContext.Provider value={{
            rooms,
            getRooms,
            addRoom,
            updateRoom,
            deleteRoom,
            getRoom,
            error,
            setError,
            success,
            setSuccess
        }}>
            {children}
        </RoomContext.Provider>
    )
}
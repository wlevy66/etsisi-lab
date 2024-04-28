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

    const getRooms = async () => {
        try{
            const response = await getRoomsRequest()
            setRooms(response.data.rooms)
        }
        catch(error){
            console.log(error)
        }
    }
    
    const getRoom = async (id) => {
        try{
            const response = await getRoomRequest(id)
            return response.data.room
        }
        catch(error){
            console.log(error)
        }
    }

    const addRoom = async (room) => {
        try{
            await createRoomRequest(room)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const updateRoom = async (id, newData) => {
        try{
            await updateRoomRequest(id, newData)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const deleteRoom = async (id) => {
        try{
            await deleteRoomRequest(id)
            setRooms(rooms.filter(room => room._id !== id))
        }
        catch(error){
            console.log(error)
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
            error
        }}>
            {children}
        </RoomContext.Provider>
    )
}
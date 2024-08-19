import roomApi from "@/api/room"
import { createContext, useContext, useState } from "react"

const RoomContext = createContext()

export const useRoom = () => {
    const context = useContext(RoomContext)
    if(!context) throw new Error('Missing RoomContext')
    return context
}

export const RoomProvider = ({ children }) => {

    const [rooms, setRooms] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const getRooms = async () => {
        try{
            const response = await roomApi.getRoomsRequest()
            setRooms(response.data.rooms)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }
    
    const getRoom = async (id) => {
        try{
            const response = await roomApi.getRoomRequest(id)
            return response.data.room
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const createRoom = async (room) => {
        try{
            const response = await roomApi.createRoomRequest(room)
            setSuccess(response.data.message)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const updateRoom = async (id, updatedRoom) => {
        try{
            const response = await roomApi.updateRoomRequest(id, updatedRoom)
            setSuccess(response.data.message)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const deleteRoom = async (id) => {
        try{
            await roomApi.deleteRoomRequest(id)
            setRooms(rooms.filter(room => room._id !== id))
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    return (
        <RoomContext.Provider value={{
            getRooms,
            getRoom,
            createRoom,
            updateRoom,
            deleteRoom,
            rooms,
            error,
            setError,
            success,
            setSuccess
        }}>
            {children}
        </RoomContext.Provider>
    )
}
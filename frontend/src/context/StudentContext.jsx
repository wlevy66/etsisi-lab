import {createContext, useContext, useState} from "react"
import { deleteReservationRequest, getReservationsRequest, updateReservationRequest, createReservationRequest } from "../api/reservation"

const StudentContext = createContext()

export const useStudent = () => {
    const context = useContext(StudentContext)
    if(!context) throw new Error('Missing StudentProvider')

    return context
}

export function StudentProvider({children}){

    const [reservations, setReservations] = useState([])

    const createReservation = async (reservation) => {
        const response = await createReservationRequest(reservation)
    }

    const getReservations = async () => {
        const response = await getReservationsRequest()
        setReservations(response)
    }

    const updateReservation = async (id, newData) => {
        const response = await updateReservationRequest(id, newData)
    }
    const deleteReservation = async (id) => {
        const response = await deleteReservationRequest(id)
        const newReservations = reservations.filter(reservation => reservation._id !== id)  
        setReservations(newReservations)
    }

    return (
        <StudentContext.Provider
            value={{
                reservations,
                createReservation,
                getReservations,
                updateReservation,
                deleteReservation
            }}>
            {children}
        </StudentContext.Provider>
    )
}
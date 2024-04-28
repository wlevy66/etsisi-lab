import { createContext, useContext, useState } from 'react'
import { getReservationRequest, addReservationRequest, deleteReservationRequest, getReservationsRequest, updateReservationRequest } from '@/api/reservation'


const ReservationContext = createContext()

export const useReservation = () => {
    const context = useContext(ReservationContext)
    if(!context) throw new Error('Missing ReservationContext')
    return context
}

export const ReservationProvider = ({ children }) => {

    const [reservations, setReservations] = useState([])
    const [error, setError] = useState(null)

    const getReservations = async (id) => {
        try{
            const response = await getReservationsRequest(id)
            setReservations(response.data.reservations)
        }
        catch(error){
            console.log(error)
        }
    }

    const getReservation = async (id, reservationId) => {
        try{
            const response = await getReservationRequest(id, reservationId)
            return response.data.reservation
        }
        catch(error){
            console.log(error)
        }
    }

    const addReservation = async (user,schedule) => {
        try{
            await addReservationRequest(user,schedule)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const updateReservation = async (id, newData) => {
        try{
            await updateReservationRequest(id, newData)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const deleteReservation = async (id) => {
        try{
            await deleteReservationRequest(id)
            setReservations(reservations.filter(reservation => reservation._id !== id))
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <ReservationContext.Provider value={{
            getReservations,
            getReservation,
            addReservation,
            updateReservation,
            deleteReservation,
            reservations,
            error
        }}>
            {children}
        </ReservationContext.Provider>
    )
}

export default ReservationContext
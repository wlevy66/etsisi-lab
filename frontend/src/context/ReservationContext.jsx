import reservationApi from '@/api/reservation'
import { createContext, useContext, useState } from 'react'

const ReservationContext = createContext()

export const useReservation = () => {
    const context = useContext(ReservationContext)
    if(!context) throw new Error('Missing ReservationContext')
    return context
}

export const ReservationProvider = ({ children }) => {

    const [reservations, setReservations] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const getReservations = async (id) => {
        try{
            const response = await reservationApi.getReservationsRequest(id)
            setReservations(response.data.reservations)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const getReservation = async (id, reservationId) => {
        try{
            const response = await reservationApi.getReservationRequest(id, reservationId)
            return response.data.reservation
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const createReservation = async (user,schedule) => {
        try{
            const response = await reservationApi.createReservationRequest(user,schedule)
            setSuccess(response.data.message)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const updateReservation = async (id, updatedReservation) => {
        try{
            const response = await reservationApi.updateReservationRequest(id, {schedule: updatedReservation})
            setSuccess(response.data.message)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const deleteReservation = async (id) => {
        try{
            await reservationApi.deleteReservationRequest(id)
            setReservations(reservations.filter(reservation => reservation._id !== id))
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    return (
        <ReservationContext.Provider value={{
            getReservations,
            getReservation,
            createReservation,
            updateReservation,
            deleteReservation,
            reservations,
            error,
            setError,
            success,
            setSuccess
        }}>
            {children}
        </ReservationContext.Provider>
    )
}

export default ReservationContext
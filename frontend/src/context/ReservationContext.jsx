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

    const getReservations = async (userId) => {
        try{
            const response = await reservationApi.getReservationsRequest(userId)
            setReservations(response.data.reservations)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const getReservation = async (userId, reservationId) => {
        try{
            const response = await reservationApi.getReservationRequest(userId, reservationId)
            return response.data.reservation
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const createReservation = async (userId, schedule) => {
        try{
            const response = await reservationApi.createReservationRequest(userId, schedule)
            setSuccess(response.data.message)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const updateReservation = async (userId, reservationId, updatedReservation) => {
        try{
            const response = await reservationApi.updateReservationRequest(userId, reservationId, {schedule: updatedReservation})
            setSuccess(response.data.message)
        }
        catch(error){
            console.log(error.response.data.error)
            setError(error.response.data.error)
        }
    }

    const deleteReservation = async (userId, reservationId) => {
        try{
            await reservationApi.deleteReservationRequest(userId, reservationId)
            setReservations(reservations.filter(reservation => reservation._id !== reservationId))
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
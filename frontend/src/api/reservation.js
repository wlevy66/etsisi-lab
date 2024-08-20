import axios from '@/api/axios'

const getReservationsRequest = (userId) => axios.get(`/reservation/reservations/${userId}`)
const getReservationRequest = (userId, reservationId) => axios.get(`/reservation/reservations/${userId}/${reservationId}`)
const createReservationRequest = (userId, schedule) => axios.post(`/reservation/reservations/${userId}`, { schedule })
const updateReservationRequest = (userId, reservationId, updatedReservation) => axios.put(`/reservation/reservations/${userId}/${reservationId}`, updatedReservation)
const deleteReservationRequest = (userId, reservationId) => axios.delete(`/reservation/reservations/${userId}/${reservationId}`)

const reservationApi = {
    getReservationsRequest,
    getReservationRequest,
    createReservationRequest,
    updateReservationRequest,
    deleteReservationRequest,
}

export default reservationApi
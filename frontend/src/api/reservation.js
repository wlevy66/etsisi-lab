import axios from '@/api/axios'

const getReservationsRequest = (id) => axios.get(`/reservation/reservations/${id}`)
const getReservationRequest = (id, reservationId) => axios.get(`/reservation/reservations/${id}/${reservationId}`)
const createReservationRequest = (user, schedule) => axios.post('/reservation/reservations', {user, schedule})
const updateReservationRequest = (id, updatedReservation) => axios.put(`/reservation/reservations/${id}`, updatedReservation)
const deleteReservationRequest = (id) => axios.delete(`/reservation/reservations/${id}`)

const reservationApi = {
    getReservationsRequest,
    getReservationRequest,
    createReservationRequest,
    updateReservationRequest,
    deleteReservationRequest,
}

export default reservationApi
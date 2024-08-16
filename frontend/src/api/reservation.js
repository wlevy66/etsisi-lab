import axios from '@/api/axios'

const getReservationsRequest = (id) => axios.get(`/reservation/reservations/${id}`)
const addReservationRequest = (user, schedule) => axios.post('/reservation/reservations', {user, schedule})
const updateReservationRequest = (id, newData) => axios.put(`/reservation/reservations/${id}`, newData)
const deleteReservationRequest = (id) => axios.delete(`/reservation/reservations/${id}`)
const getReservationRequest = (id, reservationId) => axios.get(`/reservation/reservations/${id}/${reservationId}`)

export {
    getReservationsRequest,
    addReservationRequest,
    updateReservationRequest,
    deleteReservationRequest,
    getReservationRequest
}
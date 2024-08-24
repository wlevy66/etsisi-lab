import axiosInstance from '@/api/axios'

const getReservationsRequest = (userId) => axiosInstance.get(`/reservation/reservations/${userId}`)
const getReservationRequest = (userId, reservationId) => axiosInstance.get(`/reservation/reservations/${userId}/${reservationId}`)
const createReservationRequest = (userId, schedule) => axiosInstance.post(`/reservation/reservations/${userId}`, { schedule })
const updateReservationRequest = (userId, reservationId, updatedReservation) => axiosInstance.put(`/reservation/reservations/${userId}/${reservationId}`, updatedReservation)
const deleteReservationRequest = (userId, reservationId) => axiosInstance.delete(`/reservation/reservations/${userId}/${reservationId}`)

const reservationApi = {
    getReservationsRequest,
    getReservationRequest,
    createReservationRequest,
    updateReservationRequest,
    deleteReservationRequest,
}

export default reservationApi
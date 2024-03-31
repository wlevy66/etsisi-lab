import { URL } from "../../public/data"

const getReservationsRequest = async() => {
    let request = await fetch(`${URL.RESERVATION}`, {
        method: 'GET'
    })
    
    const data = await request.json()

    return data.reservations
    
}

const getReservationByUserIdRequest = async (id) => {
    let request = await fetch (`${URL.RESERVATION}/${id}`, {
        method: 'GET'
    })
    const data = await request.json()
    return data.reservations
}

const createReservationRequest = async (newData) => {
    let request = await fetch (`${URL.RESERVATION}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })

    const data = await request.json()
    return data
}

const updateReservationRequest = async (id, newData) => {
    let request = await fetch (`${URL.RESERVATION}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })

    const data = await request.json()
    return data
}

const deleteReservationRequest = async (id) => {
    if (window.confirm('Do you really want to delete the reservation?')) {

        let request = await fetch (`${URL.RESERVATION}/${id}`, {
            method: 'DELETE'
        })
        const data = await request.json()
        return data
    }
}

export {
    getReservationsRequest,
    getReservationByUserIdRequest,
    createReservationRequest,
    updateReservationRequest,
    deleteReservationRequest
}
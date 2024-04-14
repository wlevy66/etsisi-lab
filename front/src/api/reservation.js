import { URL } from "./url"

const getReservationsRequest = async(userId) => {
    let request = await fetch(`${URL.RESERVATION}/${userId}`, {
        method: 'GET'
    })
    const response = await request.json()

    return response
    
}


const createReservationRequest = async (newData) => {
    let request = await fetch (`${URL.RESERVATION}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
        
    })
    let response = await request.json()

    return response
}

const updateReservationRequest = async (id, newData) => {
    let request = await fetch (`${URL.RESERVATION}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })
    const response = await request.json()

    return response
}

const deleteReservationRequest = async (id) => {
    if (window.confirm('Do you really want to delete the reservation?')) {
        let request = await fetch (`${URL.RESERVATION}/${id}`, {
            method: 'DELETE'
        })

        const response = await request.json()
        return response
    }
}

export {
    getReservationsRequest,
    createReservationRequest,
    updateReservationRequest,
    deleteReservationRequest
}
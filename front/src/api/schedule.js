import { URL } from "./url"

const getSchedulesRequest = async() => {
    let request = await fetch(`${URL.SCHEDULE}`, {
        method: 'GET'
    })
    const response = await request.json()

    return response
    
}

const getScheduleByRoomIdRequest = async (id) => {
    let request = await fetch (`${URL.SCHEDULE}/${id}`, {
        method: 'GET'
    })
    const response = await request.json()

    return response
}

const createScheduleRequest = async (newData) => {
    let request = await fetch (`${URL.SCHEDULE}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })
    const response = await request.json()

    return response
}

const updateScheduleRequest = async (id, newData) => {
    let request = await fetch (`${URL.SCHEDULE}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })
    const response = await request.json()

    return response
}

const deleteScheduleRequest = async (id) => {
    if (window.confirm('Do you really want to delete the schedule?')) {
        let request = await fetch (`${URL.SCHEDULE}/${id}`, {
            method: 'DELETE'
        })
        const response = await request.json()

        return response
    }
}

export {
    getSchedulesRequest,
    getScheduleByRoomIdRequest,
    createScheduleRequest,
    updateScheduleRequest,
    deleteScheduleRequest
}
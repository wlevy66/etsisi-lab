import { URL } from "./url"

const getRoomsRequest = async() => {
    let request = await fetch(`${URL.ROOM}`, {
        method: 'GET'
    })
    const response = await request.json()

    return response
    
}

const getRoomByIdRequest = async(id) => {
    let request = await fetch(`${URL.ROOM}/${id}`, {
        method: 'GET'
    })
    const response = await request.json()

    return response
    
}

const createRoomRequest = async (newData) => {
    let request = await fetch (`${URL.ROOM}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })

    const response = await request.json()
    return response
}

const updateRoomRequest = async (id, newData) => {
    let request = await fetch (`${URL.ROOM}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })
    const response = await request.json()

    return response
}

const deleteRoomRequest = async (id) => {
    if (window.confirm('Do you really want to delete the room?')) {
        let request = await fetch (`${URL.ROOM}/${id}`, {
            method: 'DELETE'
        })
        const response = await request.json()

        return response
    }
}

export {
    getRoomsRequest,
    getRoomByIdRequest,
    createRoomRequest,
    updateRoomRequest,
    deleteRoomRequest
}
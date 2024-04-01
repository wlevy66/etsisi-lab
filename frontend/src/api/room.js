
import { URL } from "../../public/data"

const getRoomsRequest = async() => {
    let request = await fetch(`${URL.ROOM}`, {
        method: 'GET'
    })
    
    const data = await request.json()

    return data.rooms
    
}

const createRoomRequest = async (newData) => {
    let request = await fetch (`${URL.ROOM}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })
    console.log(request.status)
    const data = await request.json()
    return data
}

const updateRoomRequest = async (id, newData) => {
    let request = await fetch (`${URL.ROOM}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })

    const data = await request.json()
    return data
}

const deleteRoomRequest = async (id) => {
    if (window.confirm('Do you really want to delete the room?')) {

        let request = await fetch (`${URL.ROOM}/${id}`, {
            method: 'DELETE'
        })
        const data = await request.json()
        return data
    }
}

export {
    getRoomsRequest,
    createRoomRequest,
    updateRoomRequest,
    deleteRoomRequest
}
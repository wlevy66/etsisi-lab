const URL = 'http://localhost:3900/api/room/rooms/'

const getRoomsRequest = async() => {
    let request = await fetch(`${URL}`, {
        method: 'GET'
    })
    
    const data = await request.json()

    return data.rooms
    
}

const createRoomRequest = async (newData) => {
    let request = await fetch (`${URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })

    const data = await request.json()
    return data
}

const updateRoomRequest = async (id, newData) => {
    let request = await fetch (`${URL}${id}`, {
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

        let request = await fetch (`${URL}${id}`, {
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
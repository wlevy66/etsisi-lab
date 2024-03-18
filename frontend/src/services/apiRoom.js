const apiGetRooms = async() => {
    let request = await fetch('http://localhost:3900/api/room/rooms/', {
        method: 'GET'
    })
    
    const data = await request.json()

    return data.rooms
    
}

const apiAddRoom = async (newData) => {
    let request = await fetch (`http://localhost:3900/api/room/rooms/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })

    const data = await request.json()
    return data
}

const apiUpdateRoom = async (id, newData) => {
    let request = await fetch (`http://localhost:3900/api/room/rooms/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })

    const data = await request.json()
    return data
}

const apiRemoveRoom = async (id) => {
    if (window.confirm('Do you really want to delete the room?')) {

        let request = await fetch (`http://localhost:3900/api/room/rooms/${id}`, {
            method: 'DELETE'
        })
        const data = await request.json()
        return data
    }
}

export {
    apiGetRooms,
    apiAddRoom,
    apiUpdateRoom,
    apiRemoveRoom
}
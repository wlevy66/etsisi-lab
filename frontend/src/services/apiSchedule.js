const apiGetSchedules = async() => {
    let request = await fetch('http://localhost:3900/api/schedule/schedules/', {
        method: 'GET'
    })
    
    const data = await request.json()

    return data.schedules
    
}

const apiAddSchedule = async (newData) => {
    let request = await fetch (`http://localhost:3900/api/schedule/schedules/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })

    const data = await request.json()
    return data
}

const apiUpdateSchedule = async (id, newData) => {
    let request = await fetch (`http://localhost:3900/api/schedule/schedules/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })

    const data = await request.json()
    return data
}

const apiRemoveSchedule = async (id) => {
    if (window.confirm('Do you really want to delete the schedule?')) {

        let request = await fetch (`http://localhost:3900/api/schedule/schedules/${id}`, {
            method: 'DELETE'
        })
        const data = await request.json()
        return data
    }
}

export {
    apiGetSchedules,
    apiAddSchedule,
    apiUpdateSchedule,
    apiRemoveSchedule
}
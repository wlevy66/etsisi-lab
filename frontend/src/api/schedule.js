const getSchedulesRequest = async() => {
    let request = await fetch('http://localhost:3900/api/schedule/schedules/', {
        method: 'GET'
    })
    
    const data = await request.json()

    return data.schedules
    
}

const createScheduleRequest = async (newData) => {
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

const updateScheduleRequest = async (id, newData) => {
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

const deleteScheduleRequest = async (id) => {
    if (window.confirm('Do you really want to delete the schedule?')) {

        let request = await fetch (`http://localhost:3900/api/schedule/schedules/${id}`, {
            method: 'DELETE'
        })
        const data = await request.json()
        return data
    }
}

export {
    getSchedulesRequest,
    createScheduleRequest,
    updateScheduleRequest,
    deleteScheduleRequest
}
import { URL } from "./url"

const loginRequest = async({email, password}) => {
    let request = await fetch(`${URL.USER}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    })
    let response = await request.json()

    return response
}

const registerRequest = async(newData) => {
    let request = await fetch(`${URL.USER}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })
    let response = await request.json()
    
    return response
}


export {
    loginRequest,
    registerRequest
}
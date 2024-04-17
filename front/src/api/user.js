import { URL } from "./url"
import axios from 'axios'

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

const registerRequest = user => axios.post(`${URL.USER}/register`, user)



export {
    loginRequest,
    registerRequest
}
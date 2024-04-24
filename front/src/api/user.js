import axios from './axios'


const loginRequest = (user) => axios.post(`/user/login`, user)
const registerRequest = (user) => axios.post(`/user/register`, user)
const verifyToken = () => axios.get('/user/verify')
const logoutRequest = () => axios.post('/user/logout')

export {
    loginRequest,
    registerRequest,
    verifyToken,
    logoutRequest
}
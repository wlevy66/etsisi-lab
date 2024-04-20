import axios from './axios'


const loginRequest = (user) => axios.post(`/user/login`, user)
const registerRequest = (user) => axios.post(`/user/register`, user)
const verifyToken = () => axios.get('/user/verify')


export {
    loginRequest,
    registerRequest,
    verifyToken
}
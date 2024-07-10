import axios from './axios'


const loginRequest = (user) => axios.post(`/user/login`, user)
const registerRequest = (user) => axios.post(`/user/register`, user)
const verifyTokenRequest = () => axios.get('/user/verify')
const logoutRequest = () => axios.post('/user/logout')
const getUsersRequest = () => axios.get('/user/users')
const getUserRequest = (id) => axios.get(`/user/users/${id}`)
const updateUserRequest = (id, user) => axios.put(`/user/users/${id}`, user)

export {
    loginRequest,
    registerRequest,
    verifyTokenRequest,
    logoutRequest,
    getUsersRequest,
    getUserRequest,
    updateUserRequest
}
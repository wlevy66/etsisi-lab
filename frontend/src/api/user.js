import axios from '@/api/axios'

const loginRequest = (user) => axios.post('/user/login', user)
const registerRequest = (user) => axios.post('/user/register', user)
const verifyTokenRequest = () => axios.get('/user/verify')
const logoutRequest = () => axios.post('/user/logout')
const getUsersRequest = () => axios.get('/user/users')
const getUserRequest = (id) => axios.get(`/user/users/${id}`)
const updateProfileRequest = (id, user) => axios.patch(`/user/users/update-profile/${id}`, user)
const updatePasswordRequest = (id, user) => axios.patch(`/user/users/update-password/${id}`, user)
const updateByAdminRequest = (id, user) => axios.patch(`/user/users/update-by-admin/${id}`, user)

const userApi = {
    loginRequest,
    registerRequest,
    verifyTokenRequest,
    logoutRequest,
    getUsersRequest,
    getUserRequest,
    updateProfileRequest,
    updatePasswordRequest,
    updateByAdminRequest
}

export default userApi
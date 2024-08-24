import axiosInstance from '@/api/axios'

const loginRequest = (user) => axiosInstance.post('/user/login', user)
const registerRequest = (user) => axiosInstance.post('/user/register', user)
const verifyTokenRequest = () => axiosInstance.get('/user/verify')
const logoutRequest = () => axiosInstance.post('/user/logout')
const getUsersRequest = () => axiosInstance.get('/user/users')
const getUserRequest = (id) => axiosInstance.get(`/user/users/${id}`)
const updateProfileRequest = (id, user) => axiosInstance.patch(`/user/users/update-profile/${id}`, user)
const updatePasswordRequest = (id, user) => axiosInstance.patch(`/user/users/update-password/${id}`, user)
const updateByAdminRequest = (id, user) => axiosInstance.patch(`/user/users/update-by-admin/${id}`, user)

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
import userApi from "@/api/user"
import { createContext, useState, useContext, useEffect, } from "react"
import Cookies from 'js-cookie'


const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('Missing AuthProvider')

    return context
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)
    const [users, setUsers] = useState([])

    const signUp = async (user) => {
        try{
            await userApi.registerRequest(user)
            setSuccess(true)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }
    const signIn = async (user) => {
        try{
            const response = await userApi.loginRequest(user)
            setUser(response.data)
            setIsAuthenticated(true)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const signOut = async () => {
        try{
            await userApi.logoutRequest()
            setUser(null)
            setIsAuthenticated(false)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const getUsers = async () => {
        try{
            const response = await userApi.getUsersRequest()
            setUsers(response.data.users)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const getUser = async (id) => {
        try{
            const response = await userApi.getUserRequest(id)
            return response.data
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const updateProfile = async (id, user) => {
        try{
            const response = await userApi.updateProfileRequest(id, user)
            setSuccessMessage(response.data.message)
            setSuccess(true)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const updatePassword = async (id, user) => {
        try{
            const response = await userApi.updatePasswordRequest(id, user)
            setSuccessMessage(response.data.message)
            setSuccess(true)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const updateByAdmin = async (id, user) => {
        try{
            const response = await userApi.updateByAdminRequest(id, user)
            setSuccessMessage(response.data.message)
            setSuccess(true)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    useEffect(() => {
        const validateLogin = async() =>{
            const token = Cookies.get('token')

            if(token){
                await userApi.verifyTokenRequest(token).then(response => {
                    setUser(response.data)
                    setIsAuthenticated(true)
                    setIsLoading(false)
                    console.log('Sesión activa')
                })
                .catch(() => {
                    setIsAuthenticated(false)
                    setUser(null)
                    setIsLoading(false)
                    console.log('Sesión expirada')
                })
            }
            else{
                setIsAuthenticated(false)
                setUser(null)
                setIsLoading(false)
            }
        }
        validateLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signUp,
            signIn,
            error,
            setError,
            isLoading,
            signOut,
            success,
            setSuccess,
            getUsers,
            getUser,
            users,
            updateProfile,
            updatePassword,
            updateByAdmin,
            successMessage,
            setSuccessMessage
        }}>
            {children}
        </AuthContext.Provider>
    )
}

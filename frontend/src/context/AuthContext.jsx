import { registerRequest, loginRequest, verifyToken, logoutRequest } from "@/api/user"
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

    const signUp = async (user) => {
        try{
            await registerRequest(user)
            setSuccess(true)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }
    const signIn = async (user) => {
        try{
            const response = await loginRequest(user)
            setUser(response.data)
            setIsAuthenticated(true)
        }
        catch(error){
            setError(error.response.data.error)
        }
    }

    const signOut = async () => {
        try{
            await logoutRequest()
            setUser(null)
            setIsAuthenticated(false)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        const validateLogin = async() =>{
            const cookies = Cookies.get()

            if(cookies.token){
                await verifyToken(cookies.token).then(response => {
                    setUser(response.data)
                    setIsAuthenticated(true)
                    setIsLoading(false)
                })
                .catch(() => {
                    setIsAuthenticated(false)
                    setUser(null)
                    setIsLoading(false)
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
            setSuccess
        }}>
            {children}
        </AuthContext.Provider>
    )
}

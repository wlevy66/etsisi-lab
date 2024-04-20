import { registerRequest, loginRequest, verifyToken } from "../api/user"
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

    const signUp = async (user) => {
        try{
            const response = await registerRequest(user)
            setUser(response.data)
            setIsAuthenticated(true)
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
            console.log(error)
            setError(error.response.data.error)
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
                .catch(error => {
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
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

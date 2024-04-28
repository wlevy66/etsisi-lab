import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const ProtectedRoute = () => {

    const {isAuthenticated, isLoading} = useAuth()

    if(isLoading) return <h1>Loading...</h1>
    if(!isLoading && !isAuthenticated) return <Navigate to='/login' replace/>

    return(
        <Outlet />
    )

}

export default ProtectedRoute
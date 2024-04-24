
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

const ProfessorRoutes = () => {
    const {user} = useAuth()

    if(user.role !== 'professor') return <Navigate to='/my-reservations' replace/>

    return(
        <Outlet />
    )
}

export default ProfessorRoutes
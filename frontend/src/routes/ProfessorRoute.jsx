
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const ProfessorRoute = () => {
    const { user } = useAuth()

    if(user.role === 'student') return <Navigate to='/reservations' replace/>

    return(
        <Outlet />
    )
}

export default ProfessorRoute
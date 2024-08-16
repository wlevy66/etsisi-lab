import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { STUDENT_ROLE } from "@/constants/roles"

const ProfessorRoute = () => {
    const { user } = useAuth()

    if(user.role === STUDENT_ROLE) return <Navigate to='/reservations' replace/>

    return(
        <Outlet />
    )
}

export default ProfessorRoute
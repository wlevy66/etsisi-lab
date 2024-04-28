
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const ProfessorRoute = () => {
    const {user} = useAuth()

    if(user.role !== 'professor') return <Navigate to='/my-reservations' replace/>

    return(
        <Outlet />
    )
}

export default ProfessorRoute

import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import ProfessorRoute from "./ProfessorRoute"

const AdminRoute = () => {
    const {user} = useAuth()
    console.log(user)
    
    if(user.role === 'professor') return <Navigate to='/rooms' replace/>
    if(user.role === 'student') return <Navigate to='/reservations' replace/>

    return(
        <Outlet />
    )
}

export default AdminRoute
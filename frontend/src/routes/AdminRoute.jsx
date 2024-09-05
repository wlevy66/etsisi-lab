import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { PROFESSOR_ROLE, STUDENT_ROLE } from "@/constants/roles"

const AdminRoute = () => {
    const { user } = useAuth()

    if (user.role === PROFESSOR_ROLE) return <Navigate to='/rooms' replace />
    if (user.role === STUDENT_ROLE) return <Navigate to='/reservations' replace />

    return (
        <Outlet />
    )
}

export default AdminRoute
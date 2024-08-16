import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import ModalAdminDashboard from "@/components/ModalAdminDashboard"
import { set } from "react-hook-form"

const DashboardPage = () => {

    const {getUsers, users, updateUser, getUser} = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState({})
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getUsers()
    }, [])

    const handleUpdateUser = async(user) => {
        console.log(user)
        setOpen(true)
        setId(user)
        setIsModalOpen(true) 
    }
    return (
        <div className="p-4">
            <h1 className='my-3 text-3xl font-bold italic'>USUARIOS DEL SISTEMA</h1>
            <table className='w-1/2 mx-auto'>
                <thead>
                    <tr className="text-xl border-b">
                        <th className="py-2 border-r">EMAIL</th>
                        <th className="py-2 border-r">ROL</th>
                        <th className="py-2 border-r">ESTADO</th>
                        <th className="py-2">ACCIÓN</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map(user => (
                            <tr key={user._id} className="text-center border-b ">
                                <td className="py-3 border-r">{user.email}</td>
                                <td className="py-3 uppercase border-r">{user.role}</td>
                                <td className="py-3 uppercase border-r">{user.status}</td>
                                <td className="py-3">
                                    <button className="submit"
                                    onClick={()=>handleUpdateUser(user)}>EDITAR</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        {
            open &&
            <ModalAdminDashboard user={id} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        }
        </div>
    )
}

export default DashboardPage
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import ModalAdminDashboard from "@/components/ModalAdminDashboard"
import { transformRole, transformStatus } from "@/utils/util"

const DashboardPage = () => {

    const { getUsers, users } = useAuth()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [id, setId] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getUsers()
    }, [open])

    const handleUpdateUser = async (id) => {
        setId(id)
        setOpen(true)
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
                                <td className="py-3 uppercase border-r">{transformRole(user.role)}</td>
                                <td className="py-3 uppercase border-r">{transformStatus(user.status)}</td>
                                <td className="py-3">
                                    <button className="submit"
                                        onClick={() => handleUpdateUser(user._id)}>EDITAR</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                open &&
                <ModalAdminDashboard id={id} open={isModalOpen} onClose={() => { setOpen(false); setIsModalOpen(false) }} />
            }
        </div>
    )
}

export default DashboardPage
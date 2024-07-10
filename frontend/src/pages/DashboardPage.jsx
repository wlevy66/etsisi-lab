import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import ModalProfile from "@/components/ModalProfile"
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
        <>
        <h1 className='text-2xl'>Usuarios</h1>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-2'>
            {
                users && users.map(user => (
                    <div key={user._id} className=''>
                        <p>{user.email}</p>
                        <p>{user.role}</p>
                        <p>{user.status}</p>
                        <button className="btn btn-primary mx-1"
                        onClick={()=>handleUpdateUser(user)}>Editar</button>
                        
                    </div>
                ))
            }
        </div>
        {
            open &&
            <ModalProfile user={id} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        }
        </>
    )
}

export default DashboardPage
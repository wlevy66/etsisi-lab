import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useRoom } from "@/context/RoomContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { STUDENT_ROLE } from "@/constants/roles"
import ModalConfirmAction from './ModalConfirmAction'

const RoomCard = ({ room }) => {

    const { user } = useAuth()
    const { deleteRoom } = useRoom()
    const navigate = useNavigate()

    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)
    const [actionMessage, setActionMessage] = useState(null)

    const openModalConfirm = (actionType) => {
        setIsModalConfirmOpen(true)
        switch (actionType) {
            case 'delete':
                setActionMessage('¿Estás seguro de eliminar el aula?')
                break
        }
    }

    const handleDeleteRoom = async (id) => {
        await deleteRoom(id)
        setIsModalConfirmOpen(false)
    }

    return (
        <div className="border rounded-lg p-4 my-4">
            <div className="flex justify-between">
                <div>
                    <h2 className='text-2xl font-bold'>{room.name}</h2>
                    <p className="text-xl font-bold">Capacidad: {room.capacity}</p>
                </div>
                <button className="bg-green-700 rounded my-2 justify-between font-semibold" onClick={() => navigate(`/schedules/${room._id}`)}>
                    VER HORARIOS
                </button>
            </div>
            {
                user.role !== STUDENT_ROLE && (
                    <div className="mt-3">
                        <Link to={`/edit-room/${room._id}`} >
                            <button className="bg-blue-500 rounded mx-1 float-end font-semibold">EDITAR</button>
                        </Link>
                        <button
                            onClick={() => openModalConfirm('delete')}
                            className="bg-red-600 rounded mx-1 float-end font-semibold">
                            ELIMINAR
                        </button>
                    </div>
                )
            }
            <ModalConfirmAction
                open={isModalConfirmOpen}
                onClose={() => setIsModalConfirmOpen(false)}
                onConfirm={() => handleDeleteRoom(room._id)}
                message={actionMessage}
            />
        </div>
    )
}

export default RoomCard
import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useRoom } from "@/context/RoomContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


const RoomCard = ({ room }) => {
    const { user } = useAuth()
    const { deleteRoom } = useRoom()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
    }, [user])
    
    const handleDeleteRoom = (id) => {
        deleteRoom(id)
    }

    return (

        <div className="border rounded-lg p-4 my-4">
            <div className="flex justify-between">
                <div>
                    <h2 className='text-2xl font-bold'>{room.name}</h2>
                    <p className="text-xl font-bold">Capacidad: {room.capacity}</p>
                </div>
                <button className="btn btn-success my-2 justify-between" onClick={() => navigate(`/schedules/${room._id}`)}>
                    Ver horarios
                </button>
            </div> 
            {
                user.role === 'professor' && (
                    <div className="mt-3">
                        <Link to={`/edit-room/${room._id}`} >
                            <button className="btn btn-primary mx-1 float-end">Editar</button>
                        </Link>
                        <button className="btn btn-danger mx-1 float-end" 
                        onClick={() => handleDeleteRoom(room._id)}>
                            Eliminar
                        </button>
                    </div>
                )
            }   
        </div>
    )
}

export default RoomCard
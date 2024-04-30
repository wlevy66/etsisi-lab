import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useRoom } from "@/context/RoomContext"
import { useNavigate } from "react-router-dom"


const RoomCard = ({ room }) => {
    const { user } = useAuth()
    const { deleteRoom } = useRoom()
    const navigate = useNavigate()

    const handleDeleteRoom = (id) => {
        deleteRoom(id)
    }

    return (

        <div className="border rounded-lg p-4 my-4 shadow-lg">
                <h2 className='text-xl font-bold'>{room.name}</h2>
                <p className="font-bold">Capacidad: {room.capacity}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center md:flex-row md:justify-between md:items-center mt-3">
                    <button className="btn btn-success my-2 w-full sm:w-auto" onClick={() => navigate(`/schedules/${room._id}`)}>Ver horarios</button>
                    {
                        user.role === 'professor' && (
                            <>
                            <div className="flex flex-col sm:flex-row md:gap-3 sm:gap-2 mt-2 sm:mt-0">
                                <Link to={`/edit-room/${room._id}`} >
                                    <button className="btn btn-primary my-2 w-full sm:w-auto">Editar</button>
                                </Link>
                                <button className="btn btn-danger my-2 w-full sm:w-auto" onClick={() => handleDeleteRoom(room._id)}>Eliminar</button>
                            </div>
                            </>
                        )
                    }   
                </div>
        </div>
    )
}

export default RoomCard
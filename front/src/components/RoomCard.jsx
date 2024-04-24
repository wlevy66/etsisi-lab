import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useRoom } from "../context/RoomContext"
import { useNavigate } from "react-router-dom"


const RoomCard = ({ room }) => {
    const { user } = useAuth()
    const { deleteRoom } = useRoom()
    const navigate = useNavigate()

    const handleDeleteRoom = (id) => {
        deleteRoom(id)
    }

    return (

        <div className="card mt-3">
            <div className="card-body">
            <h2 className='text-xl font-bold align-middle'>{room.name}</h2>
            <p className="font-bold">Capacidad: {room.capacity}</p>
                {
                    user.role === 'professor' && (
                        <div className="flex gap-x2 float-end my-2">
                            <Link to={`/edit-room/${room._id}`} >
                                <button className="btn btn-primary mx-1 float-end">edit</button>
                            </Link>
                            <button className="btn btn-danger mx-1 float-end" onClick={() => handleDeleteRoom(room._id)}>delete</button>
                        </div>
                    )
                }
            <button className="btn btn-success mx-1 float-start my-2"  onClick={() => navigate(`/schedules/${room._id}`)}>Ver horarios</button>
            </div>
        </div>
    )
}

export default RoomCard
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
        <div className='bg-zinc-800 max-w-md w-full p-4 rounded-md'>
            <header className='flex justify-between'>
                <h1>{room.name}</h1>
                {
                    user.role === 'professor' && (
                        <div className="flex gap-x2 float-end">
                            <Link to={`/edit-room/${room._id}`} >
                                <button className="mx-1">edit</button>
                            </Link>
                            <button className="mx-1" onClick={() => handleDeleteRoom(room._id)}>delete</button>
                        </div>
                    )
                }
            </header>
        
            <p>{room.capacity}</p>
            <div className="flex gap-x2 float-end">
                <button  onClick={() => navigate(`/schedules/${room._id}`)}>Ver horarios</button>
            </div>
        </div>
    )
}

export default RoomCard
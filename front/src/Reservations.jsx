import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRoom } from './context/RoomContext'
import RoomCard from './components/RoomCard'

const Reservations = () => {

  const [rooms, setRooms] = useState([])
  const navigate = useNavigate()
  const {getRooms} = useRoom()
  useEffect(() =>{
    getRooms().then(response => setRooms(response.rooms))
  }, [])
    
    return (
      <>
        <h1 className='my-3'>Select a room</h1>
        <div className='grid grid-cols-3 gap-2'>
          {rooms.map(room => (
            <RoomCard room={room} key={room._id} />
          ))}
        </div>
      </>

    )

}

export default Reservations
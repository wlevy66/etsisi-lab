import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRoom } from './context/RoomContext'
import RoomCard from './components/RoomCard'

const DashBoard = () => {

  const { rooms, getRooms } = useRoom()

  useEffect(() =>{
    getRooms()
  }, [])
      return (
        <>
          <h1 className='my-3 text-3xl font-bold'>List of rooms</h1>
          <div className='grid grid-cols-4 gap-2'>
            {rooms.map(room => (
              <RoomCard room={room} key={room._id} />
            ))}
          </div>
          <Link to={'/add-room'}><button className='mt-3'>Add Room</button></Link>
        </>
      )
}

export default DashBoard
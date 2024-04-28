import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRoom } from '@/context/RoomContext'
import RoomCard from '@/components/RoomCard'

const DashboardPage = () => {

  const { rooms, getRooms } = useRoom()

  useEffect(() => {
    getRooms()
  }, [])

  return (
    <>
      <h1 className='my-3 text-3xl font-bold'>Listado de aulas</h1>
      <div className='grid grid-cols-4 gap-2'>
        {rooms && rooms.map(room => (
          <RoomCard room={room} key={room._id} />
        ))}
      </div>
      <Link to={'/add-room'}><button className='mt-3 bg-sky-700 border-black p-2 rounded-md font-semibold'>Crear aula</button></Link>
    </>
  )
}

export default DashboardPage
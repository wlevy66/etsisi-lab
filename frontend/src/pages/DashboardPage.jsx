import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRoom } from '@/context/RoomContext'
import RoomCard from '@/components/RoomCard'

const DashboardPage = () => {

  const { rooms, getRooms, setError, setSuccess } = useRoom()

  useEffect(() => {
    getRooms()
    setError(null)
    setSuccess(false)
  }, [])

  return (
    <div className="p-4">
      <h1 className='my-3 text-3xl font-bold'>Listado de aulas</h1>
      {
        rooms && rooms.length === 0 && (
          <h2 className='text-2xl'>No hay aulas creadas.</h2>
        )
      }
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {rooms && rooms.map(room => (
          <RoomCard room={room} key={room._id} />
        ))}
      </div>
      <div className="mt-4">
        <Link to={'/add-room'}><button className='bg-sky-700 text-white border-black p-2 rounded-md font-semibold w-full sm:w-auto'>Crear aula</button></Link>
      </div>
    </div>
  )
}

export default DashboardPage
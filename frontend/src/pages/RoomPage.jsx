import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRoom } from '@/context/RoomContext'
import RoomCard from '@/components/RoomCard'

const RoomPage = () => {

  const { rooms, getRooms, setError, setSuccess } = useRoom()

  useEffect(() => {
    getRooms()
    setError(null)
    setSuccess(null)
  }, [])

  return (
    <div className="p-4">
      <h1 className='my-3 text-3xl font-bold italic'>LISTADO DE AULAS</h1>
      <div className="my-4">
        <Link to={'/create-room'}>
          <button className='create w-full sm:w-auto font-semibold rounded'>
          CREAR AULA
          </button>
        </Link>
      </div>
      {
        rooms && rooms.length === 0 && (
          <h2 className='text-2xl italic'>No hay aulas creadas.</h2>
        )
      }
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {rooms && rooms.map(room => (
          <RoomCard room={room} key={room._id} />
        ))}
      </div>

    </div>
  )
}

export default RoomPage
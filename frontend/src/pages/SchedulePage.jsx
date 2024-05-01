import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSchedule } from '@/context/ScheduleContext'
import ScheduleCard from '@/components/ScheduleCard'


const SchedulePage = () => {

  const params = useParams()
  const { getSchedulesByRoom, schedules, setError, setSuccess } = useSchedule()

  useEffect(() => {
    getSchedulesByRoom(params.roomId)
    setError(null)
    setSuccess(false)
    console.log(schedules)
  }, [])

  return (
    <div className="p-4">
      <h1 className='my-3 text-3xl font-bold'>Listado de horarios</h1>
      {
        schedules && schedules.length === 0 && (
          <h2 className='text-2xl'>No hay horarios disponibles.</h2>
        )
      }
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {schedules && schedules.map(schedule => (
          <ScheduleCard schedule={schedule} key={schedule._id} />
        ))}
      </div>
      <div className="mt-4">
        <Link to={`/add-schedule/${params.roomId}`}><button className='bg-sky-700 text-white border-black p-2 rounded-md font-semibold w-full sm:w-auto'>Crear horario</button></Link>
      </div>
    </div>
  )
}

export default SchedulePage

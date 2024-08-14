import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSchedule } from '@/context/ScheduleContext'
import ScheduleCard from '@/components/ScheduleCard'


const SchedulePage = () => {

  const params = useParams()
  const navigate = useNavigate()
  const { getSchedulesByRoom, schedules, setError, setSuccess } = useSchedule()

  useEffect(() => {
    const getSchedules = async() => {
      await getSchedulesByRoom(params.roomId)
    }
    getSchedules()
    setError(null)
    setSuccess(false)
    console.log(schedules)
  }, [])

  return (
    <div className="p-4">
      <h1 className='my-3 text-3xl font-bold'>
        Listado de horarios { !schedules  && <span className='italic'>del aula {schedules[0].room.name}</span> }
      </h1>
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
      <div className="my-3">
        <button onClick={(e) => {
          e.preventDefault()
          navigate(`/rooms`)
        }}
          className='bg-slate-500 hover:bg-slate-700  py-2 px-4 mx-3 rounded '>
          Cancelar
        </button>
        <Link to={`/add-schedule/${params.roomId}`}><button className='bg-sky-700 text-white border-black p-2 rounded-md font-semibold w-full sm:w-auto'>Crear horario</button></Link>
      </div>
    </div>
  )
}

export default SchedulePage

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
      <h1 className='my-3 text-3xl font-bold italic'>
        LISTADO DE HORARIOS { schedules.length !== 0  && <span>DEL AULA: {schedules[0].room.name}</span> }
      </h1>
      <div className="my-4">
        <Link to={`/add-schedule/${params.roomId}`}>
          <button className='create w-full sm:w-auto font-semibold rounded'>CREAR HORARIO</button>
        </Link>
      </div>
      {
        schedules && schedules.length === 0 && (
          <h2 className='text-2xl italic'>No hay horarios creados.</h2>
        )
      }
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {schedules && schedules.map(schedule => (
          <ScheduleCard schedule={schedule} key={schedule._id} />
        ))}
      </div>
      <div className="my-3">
        <button onClick={(e) => {
          e.preventDefault()
          navigate(`/rooms`)
        }}
          className='bg-slate-500 hover:bg-slate-700 font-semibold py-2 px-4 rounded'>
          VOLVER A AULAS
        </button>
      </div>
    </div>
  )
}

export default SchedulePage

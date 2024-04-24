import { useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSchedule } from './context/ScheduleContext'
import ScheduleCard from './components/ScheduleCard'


const Schedules = () => {

  const params = useParams()
  const {getSchedulesByRoom, schedules} = useSchedule()

  useEffect(() => {
    getSchedulesByRoom(params.roomId)
  }, [])

  return (
    <>
      <h1 className='my-3 text-3xl font-bold'>List of schedules</h1>
      <div className='grid grid-cols-4 gap-2'>
      {schedules.map(schedule => (
        <ScheduleCard schedule={schedule} key={schedule._id} />
      ))}
      </div>
      <Link to={`/add-schedule/${params.roomId}`}><button className='mt-3 bg-sky-700 border-black p-2 rounded-md'>Add schedule</button></Link>
    </>

  )
}

export default Schedules

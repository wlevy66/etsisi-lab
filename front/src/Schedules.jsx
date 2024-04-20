import React, { useEffect, useState  } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {getScheduleByRoomIdRequest, deleteScheduleRequest} from './api/schedule'
import { DataGrid } from '@mui/x-data-grid'

import { changeFormat } from './util'
import ScheduleCard from './components/ScheduleCard'


const Schedules = () => {

  const [schedules, setSchedules] = useState([])
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(params)
    getScheduleByRoomIdRequest(params.roomId).then(response => setSchedules(response.schedules))
  }, [])

  return (
    <>
      <h1 className='my-3 text-3xl font-bold'>List of schedules</h1>
      <div className='grid grid-cols-4 gap-2'>
      {schedules.map(schedule => (
        <ScheduleCard schedule={schedule} key={schedule._id} />
      ))}
      </div>
      <Link to={'/add-room'}><button className='mt-3'>Add schedule</button></Link>
    </>

  )
}

export default Schedules

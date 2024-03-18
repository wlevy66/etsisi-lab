
import React, { useState, useEffect } from 'react'

import { apiGetSchedules, apiRemoveSchedule, apiUpdateSchedule } from '@/services/apiSchedule'

const SchedueList = ({schedules}) => {
  const [localSchedules, setLocalSchedules] = useState([])

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        let response = await apiGetSchedules()
        setLocalSchedules(response)
      }catch (error) {
        console.error('Error: ', error)
      }
    }
    fetchSchedules()
  }, [schedules])

  const removeSchedule = async (id) => {
    try {
      await apiRemoveSchedule(id)
      let newSchedules = await apiGetSchedules()
      setLocalSchedules(newSchedules)
    }catch (error) {
        console.log('Error', error)
    }
  }

  const updateSchedule = async (id, newData) => {
    try {
      await apiUpdateSchedule(id, newData)
      let newSchedules = await apiGetSchedules()
      setLocalSchedules(newSchedules)
    } catch (error) {
      console.log('Error: ', error)
    }
  }



  function dateParser(datetime) {
    let date = datetime.split('T')
    return date[1].substring(0,5)
  }

  return (
    localSchedules.map( (schedule) => {
        let start = dateParser(schedule.start)
        let end = dateParser(schedule.start)
        return(
        
          <li key={schedule._id} className="list-group-item my-1">
            <strong>{schedule.room.name}</strong>
            <p>Capacidad: {schedule.room.capacity}</p>
            <p>
              <span className="fs-5">{start} - </span>
              <span className="fs-5">{end} </span>
            </p>
            <button type="button" className="btn btn-secondary btn-sm ms-2">update</button>
            <button type="button" className="btn btn-danger btn-sm ms-2" onClick={()=>removeSchedule(schedule._id)}>delete</button>
          </li>
        )
        })
  )

}

export default SchedueList;


import React, { useState, useEffect } from 'react'
import {useDashboard} from "../../context/DashboardContext.jsx";

const ScheduleList = () => {

    const {schedules, getSchedules} = useDashboard()

    useEffect(() => {
        getSchedules()
    }, [])


  function dateParser(datetime) {
    let date = datetime.split('T')
    return date[1].substring(0,5)
  }

  return (
      schedules.map( (schedule) => {
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
            <button type="button" className="btn btn-danger btn-sm ms-2">delete</button>
          </li>
        )
        })
  )

}

export default ScheduleList;

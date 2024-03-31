
import React, { useState, useEffect } from 'react'
import {useDashboard} from "../../context/DashboardContext.jsx";
import { Link, useParams } from 'react-router-dom';
import ScheduleCard from './ScheduleCard.jsx';

const ScheduleList = () => {

  const user = JSON.parse(localStorage.getItem('user')).role
  const {schedules, deleteSchedule, getScheduleByRoomId} = useDashboard()
  const params = useParams()

  useEffect(() => {
      console.log(params.id)
      getScheduleByRoomId(params.id)
  }, [])

  const handleRemove = (id) => {
    deleteSchedule (id)
  }



  return (
    <>
      {schedules.length > 0 ? (
        <>
          <div className="row mt-3 mb-3">
            <div className="col-md-3"></div>
            <div className="col-md-6 text-center">
              <h3 className="text-center text-decoration-underline">{`${schedules[0].room.name} schedules`}</h3>
              <ul className="list-group list-group-flush">
                {schedules.map( (schedule) => (
                  <li key={schedule._id} className="list-group-item my-1">
                    <ScheduleCard  schedule={schedule} /> 
                    {user === 'professor' ?
                    <>
                    <Link to={`/lab/edit-schedule/${schedule._id}`}>
                      <button type="button" className="btn btn-secondary btn-sm ms-2">update</button>
                    </Link>
                    <button type="button" className="btn btn-danger btn-sm ms-2" onClick={()=>handleRemove(schedule._id)}>delete</button>
                    </> :
                    <button type="button" className="btn btn-info btn-sm ms-2" onClick={()=>console.log('book')}>book</button>
                    }
                  </li>
                  
                ))}
              </ul>
            </div>
            <div className="col-md-3"></div>
          </div>
          </>
      ) : (<h3 className='text-center'>There are not schedules.</h3>)
      }
    </>
  )

}

export default ScheduleList;

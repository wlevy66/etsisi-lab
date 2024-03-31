import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { useStudent } from "../../context/StudentContext"
import ScheduleCard from './ScheduleCard'

const ReservationList = () => {

    const {reservations, deleteReservation, getReservations} = useStudent()
    const params = useParams()
  
    useEffect(() => {
      getReservations()
    }, [])
  
    const handleRemove = (id) => {
        deleteReservation (id)
    }
  
  
  
    return (
      <>
        {reservations.length > 0 ? (
          <>
            <div className="row mt-3 mb-3">
              <div className="col-md-3"></div>
              <div className="col-md-6 text-center">
                <h3 className="text-center text-decoration-underline">{`schedules`}</h3>
                <ul className="list-group list-group-flush">
                  {reservations.map( (reservation) => (
                    <li key={reservation._id} className="list-group-item my-1">
                      <ScheduleCard  schedule={reservation.schedule} /> 
                      <Link to={`/lab/edit-schedule/${reservation._id}`}>
                        <button type="button" className="btn btn-secondary btn-sm ms-2">update</button>
                      </Link>
                      <button type="button" className="btn btn-danger btn-sm ms-2" onClick={()=>handleRemove(reservation._id)}>delete</button> 
                    </li>
                    
                  ))}
                </ul>
              </div>
              <div className="col-md-3"></div>
            </div>
            </>
        ) : (<h3 className='text-center'>There are not reservations.</h3>)
        }
      </>
    )


}

export default ReservationList
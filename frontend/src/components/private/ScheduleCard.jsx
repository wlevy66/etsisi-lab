
import React, { useState, useEffect } from 'react'
import {useDashboard} from "../../context/DashboardContext.jsx";
import { Link, useParams } from 'react-router-dom';

const ScheduleCard = ({schedule}) => {

    function dateParser(datetime) {
        let date = datetime.split('T')
        return date[1].substring(0,5)
    }
    
  return (
    <>
        <strong>{schedule.room.name}</strong>
        <p>Capacidad: {schedule.room.capacity}</p>
        <p>
        <span className="fs-5">{dateParser(schedule.start)} - </span>
        <span className="fs-5">{dateParser(schedule.end)} </span>
        </p>

    </>
    
  )
}

export default ScheduleCard;

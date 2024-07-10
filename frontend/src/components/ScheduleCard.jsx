import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSchedule } from '@/context/ScheduleContext'
import { useAuth } from "@/context/AuthContext"
import { useReservation } from '@/context/ReservationContext'
import ModalUsers from '@/components/ModalUsers'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const ScheduleCard = ({ schedule, type }) => {
    const navigate = useNavigate()
    const {deleteSchedule, getUsersBySchedule} = useSchedule()
    const {updateReservation, addReservation} = useReservation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservations, setReservations] = useState([]);
  
    const {user} = useAuth()
    const params = useParams()
    
    const handleDelete = async(id) => {
        deleteSchedule(id)
    }

    const handleUpdateReservation = async(id, schedule) => {
        await updateReservation(id, schedule).then(() => navigate('/reservations') )
    }

    const handleAddReservation = async(user, schedule) => {
        await addReservation(user, schedule).then(() => navigate('/reservations')).catch(error => console.log(error))
    }

    const showUsers = async(scheduleId) => {
        const response = await getUsersBySchedule(scheduleId)
        console.log(response)
        setReservations(response)
        setIsModalOpen(true)  
    }

    
    return (
        <div className="card my-3">
            <div className="card-body">
                <h2 className='text-xl font-bold'>{schedule.room.name} <button onClick={()=>showUsers(schedule._id)}>{schedule.reservedBy}/{schedule.room.capacity}</button></h2>
                
                <p className="card-text">Start: { dayjs(schedule.start).utc().format('DD-MM-YYYY - HH:mm') }</p>
                <p className="card-text">End: { dayjs(schedule.end).utc().format('DD-MM-YYYY - HH:mm') }</p>
                {
                    type === 'add' ?
                    <>
                        <button className="btn btn-success mx-1 float-end" onClick={() => handleAddReservation(user.id, schedule._id)}>Reservar</button>
                    </>
                    :
                    <>
                    {
                        !params.reservationId ?
                        <>
                        <button className="btn btn-primary mx-1 float-end" onClick={() => navigate(`/edit-schedule/${schedule.room._id}/${schedule._id}`)}>Editar</button>
                        <button className="btn btn-danger mx-1 float-end" onClick={() => handleDelete(schedule._id)}>Eliminar</button>
                        </>
                        : <button className="btn btn-success mx-1 float-end" onClick={() => handleUpdateReservation(params.reservationId, schedule._id)}>Actualizar reserva</button>
                    }
                    </>
                }
                <ModalUsers reservations={reservations} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    )
}

export default ScheduleCard
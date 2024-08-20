import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSchedule } from '@/context/ScheduleContext'
import { useAuth } from "@/context/AuthContext"
import { useReservation } from '@/context/ReservationContext'
import ModalUsersInSchedule from '@/components/ModalUsersInSchedule'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const ScheduleCard = ({ schedule, type }) => {
    const navigate = useNavigate()
    const {deleteSchedule, getUsersBySchedule} = useSchedule()
    const {updateReservation, createReservation, error} = useReservation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservations, setReservations] = useState([]);
  
    const {user} = useAuth()
    const params = useParams()
    
    const handleDelete = async(id) => {
        deleteSchedule(id)
    }

    const handleUpdateReservation = async(userId, reservationId, schedule) => {
        await updateReservation(userId, reservationId, schedule).then(() => navigate('/reservations'))
    }

    const handleCreateReservation = async(userId, schedule) => {
        await createReservation(userId, schedule).then(() => navigate('/reservations'))
    }

    const showUsers = async(scheduleId) => {
        const response = await getUsersBySchedule(scheduleId)
        setReservations(response)
        setIsModalOpen(true)  
    }

    return (
        <div className="border rounded-lg p-4 my-4">
            <div className="justify-self-start">
                <div className='flex gap-4 mb-3'>
                    <h2 className='text-2xl font-bold'>{schedule.room.name}</h2>
                    <button className='bg-red-600 rounded' 
                        onClick={()=>showUsers(schedule._id)}>
                        {schedule.reservedBy}/{schedule.room.capacity}
                    </button>
                </div>
                <p className="text-xl font-bold">Día: { dayjs(schedule.start).utc().format('DD-MM-YYYY') }</p>
                <p className="text-xl font-bold">Inicio: { dayjs(schedule.start).utc().format('HH:mm') }</p>
                <p className="text-xl font-bold">Fin: { dayjs(schedule.end).utc().format('HH:mm') }</p>
            </div>
                {
                    type === 'create' ?
                    <>
                        <button className="bg-green-700 rounded mx-1 float-end font-semibold" 
                        onClick={() => handleCreateReservation(user.id, schedule._id)}>
                            RESERVAR
                        </button>
                    </>
                    :
                    <>
                    {
                        params.reservationId ?
                        <div className="mt-3">
                            <button className="bg-blue-500 rounded mx-1 float-end font-semibold" 
                                onClick={() => navigate(`/edit-schedule/${schedule.room._id}/${schedule._id}`)}>
                                EDITAR
                            </button>
                            <button className="bg-red-600 rounded mx-1 float-end font-semibold" 
                                onClick={() => handleDelete(schedule._id)}>
                                ELIMINAR
                            </button>
                        </div>
                        : <button className="mt-3 bg-green-700 rounded mx-1 float-end semibold"
                            onClick={() => handleUpdateReservation(user.id, params.reservationId, schedule._id)}>
                                RESERVAR
                            </button>
                    }
                    </>
                }
                <ModalUsersInSchedule reservations={reservations} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
            
        </div>
    )
}

export default ScheduleCard
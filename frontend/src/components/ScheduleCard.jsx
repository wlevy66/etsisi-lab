import { useParams, useNavigate } from 'react-router-dom'
import { useSchedule } from '@/context/ScheduleContext'
import { useAuth } from "@/context/AuthContext"
import { useReservation } from '@/context/ReservationContext'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const ScheduleCard = ({ schedule, type }) => {
    const navigate = useNavigate()
    const {deleteSchedule} = useSchedule()
    const {updateReservation, addReservation} = useReservation()

    const {user} = useAuth()
    const params = useParams()
    
    const handleDelete = async(id) => {
        deleteSchedule(id)
    }

    const handleUpdateReservation = async(id, schedule) => {
        console.log(id, schedule)
        await updateReservation(id, schedule).then(() => navigate('/my-reservations') )
    }

    const handleAddReservation = async(user, schedule) => {
        await addReservation(user, schedule).then(() => navigate('/my-reservations')).catch(error => console.log(error))
    }

    
    return (
        <div className="card mt-3">
            <div className="card-body">
                <h2 className='text-xl font-bold'>{schedule.room.name} <span>{schedule.reservedBy}/{schedule.room.capacity}</span></h2>
                
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
                        : <button className="btn btn-success mx-1 float-end" onClick={() => handleUpdateReservation(params.reservationId, schedule)}>Actualizar reserva</button>
                    }
                    </>
                }

            </div>
        </div>
    )
}

export default ScheduleCard
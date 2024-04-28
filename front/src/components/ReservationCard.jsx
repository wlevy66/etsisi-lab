import { useReservation } from "@/context/ReservationContext"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const ReservationCard = ({ reservation }) => {

    const { deleteReservation } = useReservation()
    const navigate = useNavigate()
    const params = useParams()

    const handleDeleteReservation = (id) => {
        deleteReservation(id)
    }

    return (
        <div className='border border-gray-200 p-3 rounded-lg'>
            <div className='flex justify-between my-1'>
                <h2 className='text-xl font-bold'>{reservation.schedule.room.name}</h2>
                {
                    Object.keys(params).length !== 0 ? <></>
                    :   <div className="justify-items-center">
                            <button className="btn btn-primary mx-2" onClick={() => navigate(`/edit-reservation/${reservation._id}`)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteReservation(reservation._id)}>Delete</button>
                        </div>
                }
               
            </div>
            <p>Inicio: {dayjs(reservation.schedule.start).utc().format('DD-MM-YYYY - HH:mm')}</p>
            <p>Fin: {dayjs(reservation.schedule.end).utc().format('DD-MM-YYYY - HH:mm')}</p>
        </div>
    )
}

export default ReservationCard
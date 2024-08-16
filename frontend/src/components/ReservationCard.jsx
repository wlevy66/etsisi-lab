import { useReservation } from "@/context/ReservationContext"
import { Link, useParams } from "react-router-dom"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const ReservationCard = ({ reservation }) => {

    const { deleteReservation } = useReservation()
    const params = useParams()

    const handleDeleteReservation = (id) => {
        deleteReservation(id)
    }

    return (
        <div className='border rounded-lg p-4 my-4'>
            <div className='justify-self-start'>
                <h2 className='text-2xl font-bold'>{reservation.schedule.room.name}</h2>
                <p className="text-xl font-bold">Día: { dayjs(reservation.schedule.start).utc().format('DD-MM-YYYY') }</p>
                <p className="text-xl font-bold">Inicio: {dayjs(reservation.schedule.start).utc().format('HH:mm')}</p>
                <p className="text-xl font-bold">Fin: {dayjs(reservation.schedule.end).utc().format('HH:mm')}</p>
            </div>
            {
                    !params.reservationId &&
                    <div className="mt-3">
                        <Link to={`/edit-reservation/${reservation._id}`}>
                            <button className="bg-blue-500 rounded mx-1 float-end font-semibold">
                                EDITAR
                            </button>
                        </Link>
                        <button className="bg-red-600 rounded mx-1 float-end font-semibold"
                            onClick={() => handleDeleteReservation(reservation._id)}>
                            ELIMINAR
                        </button>
                    </div>
                }
        </div>
    )
}

export default ReservationCard
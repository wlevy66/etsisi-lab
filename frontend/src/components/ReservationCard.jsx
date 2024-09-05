import { useState } from "react"
import { useReservation } from "@/context/ReservationContext"
import { Link, useParams } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import ModalConfirmAction from './ModalConfirmAction'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const ReservationCard = ({ reservation }) => {

    const { deleteReservation } = useReservation()
    const { user } = useAuth()
    const params = useParams()

    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)
    const [actionMessage, setActionMessage] = useState(null)

    const openModalConfirm = (actionType) => {
        setIsModalConfirmOpen(true)
        switch (actionType) {
            case 'delete':
                setActionMessage('¿Estás seguro de eliminar la reserva?')
                break
        }
    }

    const handleDeleteReservation = async (userId, reservationId) => {
        await deleteReservation(userId, reservationId)
        setIsModalConfirmOpen(false)
    }

    return (
        <div className='border rounded-lg p-4 my-4'>
            <div className='justify-self-start'>
                <h2 className='text-2xl font-bold'>{reservation.schedule.room.name}</h2>
                <p className="text-xl font-bold">Día: {dayjs(reservation.schedule.start).utc().format('DD-MM-YYYY')}</p>
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
                    <button
                        onClick={() => openModalConfirm('delete')}
                        className="bg-red-600 rounded mx-1 float-end font-semibold">
                        ELIMINAR
                    </button>
                </div>
            }
            <ModalConfirmAction
                open={isModalConfirmOpen}
                onClose={() => setIsModalConfirmOpen(false)}
                onConfirm={() => handleDeleteReservation(user.id, reservation._id)}
                message={actionMessage}
            />
        </div>
    )
}

export default ReservationCard
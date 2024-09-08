import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSchedule } from '@/context/ScheduleContext'
import { useAuth } from "@/context/AuthContext"
import { useReservation } from '@/context/ReservationContext'
import ModalUsersInSchedule from '@/components/ModalUsersInSchedule'
import ModalConfirmAction from './ModalConfirmAction'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const ScheduleCard = ({ schedule, type }) => {

    const { deleteSchedule, getUsersBySchedule } = useSchedule()
    const { updateReservation, createReservation } = useReservation()
    const { user } = useAuth()
    const params = useParams()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)
    const [modalValues, setModalValues] = useState({})

    const openModalConfirm = (actionType) => {
        setIsModalConfirmOpen(true)
        switch (actionType) {
            case 'delete':
                setModalValues({
                    message: '¿Estás seguro de eliminar el horario?',
                    callback: () => handleDeleteSchedule(schedule._id)
                })
                break
            case 'create':
                setModalValues({
                    message: '¿Estás seguro de crear la reserva?',
                    callback: () => handleCreateReservation(user.id, schedule._id)
                })
                break
            case 'update':
                setModalValues({
                    message: '¿Estás seguro de actualizar la reserva?',
                    callback: () => handleUpdateReservation(user.id, params.reservationId, schedule._id)
                })
                break
        }
    }

    const showUsers = async (scheduleId) => {
        const response = await getUsersBySchedule(scheduleId)
        setReservations(response)
        setIsModalOpen(true)
    }

    const handleDeleteSchedule = async (id) => {
        await deleteSchedule(id)
        setIsModalConfirmOpen(false)
    }

    const handleUpdateReservation = async (userId, reservationId, schedule) => {
        await updateReservation(userId, reservationId, schedule).then(() => navigate('/reservations'))
        setIsModalConfirmOpen(false)
    }

    const handleCreateReservation = async (userId, schedule) => {
        await createReservation(userId, schedule).then(() => navigate('/reservations'))
        setIsModalConfirmOpen(false)
    }

    return (
        <div className="border rounded-lg p-4 my-4">
            <div className="justify-self-start">
                <div className='flex gap-4 mb-3'>
                    <h2 className='text-2xl font-bold'>{schedule.room.name}</h2>
                    <button
                        className={`${schedule.reservedBy !== schedule.room.capacity ? 'bg-green-600' : 'bg-red-600 disabled:opacity-75'} rounded`}
                        onClick={() => showUsers(schedule._id)} 
                        >
                            {
                                /*disabled={schedule.reservedBy === schedule.room.capacity}*/
                            }
                        {schedule.reservedBy}/{schedule.room.capacity}
                    </button>
                </div>
                <p className="text-xl font-bold">Día: {dayjs(schedule.start).utc().format('DD-MM-YYYY')}</p>
                <p className="text-xl font-bold">Inicio: {dayjs(schedule.start).utc().format('HH:mm')}</p>
                <p className="text-xl font-bold">Fin: {dayjs(schedule.end).utc().format('HH:mm')}</p>
            </div>
            {
                type === 'create' ?
                    <>
                        <button className="bg-green-700 rounded mx-1 float-end font-semibold"
                            onClick={() => openModalConfirm('create')}>
                            RESERVAR
                        </button>
                    </>
                    :
                    <>
                        {
                            !params.reservationId ?
                                <div className="mt-3">
                                    <button className="bg-blue-500 rounded mx-1 float-end font-semibold"
                                        onClick={() => navigate(`/edit-schedule/${schedule.room._id}/${schedule._id}`)}>
                                        EDITAR
                                    </button>
                                    <button className="bg-red-600 rounded mx-1 float-end font-semibold"
                                        onClick={() => openModalConfirm('delete')}>
                                        ELIMINAR
                                    </button>
                                </div>
                                : <button className="mt-3 bg-green-700 rounded mx-1 float-end semibold"
                                    onClick={() => openModalConfirm('update')}>
                                    ACTUALIZAR
                                </button>
                        }
                    </>
            }
            <ModalUsersInSchedule reservations={reservations} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <ModalConfirmAction
                open={isModalConfirmOpen}
                onClose={() => setIsModalConfirmOpen(false)}
                onConfirm={modalValues.callback}
                message={modalValues.message}
            />

        </div>
    )
}

export default ScheduleCard
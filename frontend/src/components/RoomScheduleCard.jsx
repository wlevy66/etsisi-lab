import { useEffect, useState } from 'react'
import { useSchedule } from '@/context/ScheduleContext'
import { useReservation } from '@/context/ReservationContext'
import { useParams, useNavigate } from 'react-router-dom'
import ReservationCard from './ReservationCard'
import ScheduleCard from './ScheduleCard'
import { useAuth } from '@/context/AuthContext'

const RoomScheduleCard = () => {
    const { getAvailableSchedules, schedules } = useSchedule()
    const { getReservation } = useReservation()
    const [currentReservation, setCurrentReservation] = useState(null)
    const [isLoaded, setIsLoaded] = useState(true)
    const params = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.reservationId) {
            const fetchData = async () => {
                await Promise.all([
                    getReservation(user.id, params.reservationId).then(reservation => {
                        setCurrentReservation(reservation)
                    }),
                    getAvailableSchedules(user.id)
                ])

                setIsLoaded(false)
            }
            fetchData()
        }
        else {
            const fetchSchedules = async () => {
                await getAvailableSchedules(user.id)
                setIsLoaded(false)
            }
            fetchSchedules()
        }
    }, [params.reservationId])

    return (
        isLoaded ? (
            <h1 className='text-2xl mx-auto my-auto'>Loading...</h1>
        ) : (
            <>
                {
                    params.reservationId ?
                        <>
                            <h1 className='my-3 text-3xl font-bold italic'>RESERVA ACTUAL</h1>
                            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {currentReservation && (
                                    <ReservationCard reservation={currentReservation} key={currentReservation._id} />
                                )}
                            </div>
                            <hr />
                            <h1 className='my-3 text-3xl font-bold italic'>HORARIOS DISPONIBLES</h1>
                            {
                                schedules && schedules.length === 0 &&
                                <h2 className='text-2xl italic'>Actualmente no hay horarios disponibles.</h2>
                            }
                            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {schedules &&
                                    schedules.map(schedule => {
                                        return (<ScheduleCard schedule={schedule} key={schedule._id} />)
                                    })}
                            </div>
                        </>
                        :
                        <>
                            <h1 className='my-3 text-3xl font-bold italic'>HORARIOS DISPONIBLES</h1>
                            {
                                schedules && schedules.length === 0 &&
                                <h2 className='text-2xl italic'>Actualmente no hay horarios disponibles.</h2>
                            }
                            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {schedules &&
                                    schedules.map(schedule => {
                                        return (<ScheduleCard schedule={schedule} type={'add'} key={schedule._id} />)
                                    })}
                            </div>
                        </>
                }
                <div className="my-3">
                    <button onClick={(e) => {
                        e.preventDefault()
                        navigate(`/reservations`)
                    }}
                        className='bg-slate-500 hover:bg-slate-700 font-semibold py-2 px-4 rounded'>
                        CANCELAR
                    </button>
                </div>
            </>
        )
    )
}

export default RoomScheduleCard

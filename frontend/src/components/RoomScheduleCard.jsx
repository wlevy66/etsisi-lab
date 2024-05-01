import { useEffect, useState } from 'react'
import { useSchedule } from '@/context/ScheduleContext'
import { useReservation } from '@/context/ReservationContext'
import { useParams } from 'react-router-dom'
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

    useEffect(() => {
        if(params.reservationId){
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
        else{
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
                    params.reservationId  ?
                    <>
                    <h1 className='my-3 text-3xl font-bold text-center'>Edita tu reserva</h1>
                    <h3 className='my-3 text-xl font-bold'>Reserva actual</h3>
                    <div className='grid grid-cols-4 gap-2'>
                        {currentReservation && (
                            <ReservationCard reservation={currentReservation} key={currentReservation._id} />
                        )}
                    </div>
                    <h1 className='my-3 text-3xl font-bold'>Horarios disponibles</h1>
                    {
                        schedules && schedules.length === 0 && 
                            <h2 className='text-2xl'>No available schedules.</h2>
                    }
                    <div className='grid grid-cols-4 gap-2'>
                        {schedules &&
                            schedules.map(schedule => {
                                return (<ScheduleCard schedule={schedule} key={schedule._id} />)
                        })}
                    </div>
                    </>
                    :
                    <>
                    <h1 className='my-3 text-3xl font-bold text-center'>Selecciona tu reserva</h1>
                    <h3 className='my-3 text-xl font-bold'>Horarios disponibles</h3>
                    <div className='grid grid-cols-4 gap-2'>
                        {schedules &&
                            schedules.map(schedule => {
                                return (<ScheduleCard schedule={schedule} type={'add'} key={schedule._id} />)
                        })}
                    </div>
                    </>
                }
            </>
        )
    )
}

export default RoomScheduleCard

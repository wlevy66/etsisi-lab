import { useEffect, useState } from 'react'
import { useSchedule } from '@/context/ScheduleContext'
import { useReservation } from '@/context/ReservationContext'
import { useParams } from 'react-router-dom'
import ReservationCard from './ReservationCard'
import ScheduleCard from './ScheduleCard'

const RoomScheduleCard = () => {
    const { getSchedules, schedules } = useSchedule()
    const { getReservation } = useReservation()
    const [currentReservation, setCurrentReservation] = useState(null)
    const [isLoaded, setIsLoaded] = useState(true)
    const params = useParams()
    
    useEffect(() => {
        if(params.reservationId){
            let timeoutId

            const fetchData = async () => {
                await Promise.all([
                    getReservation('66009730078fcfc9d77de48a', params.reservationId).then(reservation => {
                        setCurrentReservation(reservation)
                    }),
                    getSchedules()
                ]);
    
                setIsLoaded(false)
            }
    
            timeoutId = setTimeout(fetchData, 500)
    
            return () => {
                clearTimeout(timeoutId)
            }
        }
        else{
            const fetchSchedules = async () => {
                await getSchedules()
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
                    <h1 className='my-3 text-3xl font-bold'>Current reservation</h1>
                    <div className='grid grid-cols-4 gap-2'>
                        {currentReservation && (
                            <ReservationCard reservation={currentReservation} key={currentReservation._id} />
                        )}
                    </div>
                    <h1 className='my-3 text-3xl font-bold'>Available schedules</h1>
                    <div className='grid grid-cols-4 gap-2'>
                        {schedules &&
                            schedules.map(schedule => {
                                if (schedule._id !== currentReservation.schedule._id) {
                                    return <ScheduleCard schedule={schedule} key={schedule._id} />
                                }
                                return null
                            })}
                    </div>
                    </>
                    :
                    <>
                    <h1 className='my-3 text-3xl font-bold'>Available schedules</h1>
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

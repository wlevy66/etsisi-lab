import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useReservation } from '@/context/ReservationContext'
import  ReservationCard  from '@/components/ReservationCard'
import { useAuth } from '@/context/AuthContext'

const ReservationPage = () => {
  const {getReservations, reservations} = useReservation()
  const { user } = useAuth()

  useEffect(() => {
    const fetchReservations = async () => {
      await getReservations(user.id)
    }
    fetchReservations()
  }, [])

  return (
    <>
      <h1 className='my-3 text-3xl font-bold'>List of reservations</h1>
      <div className='grid grid-cols-4 gap-2'>
      {reservations && reservations.map(reservation => (
        <ReservationCard reservation={reservation} key={reservation._id} />
      ))}
      </div>
      <Link to={`/add-reservation`}><button className='mt-3 bg-sky-700 border-black p-2 rounded-md'>Add reservation</button></Link>
    </>

  )
}

export default ReservationPage
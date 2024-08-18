import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useReservation } from '@/context/ReservationContext'
import  ReservationCard  from '@/components/ReservationCard'
import { useAuth } from '@/context/AuthContext'

const ReservationPage = () => {
  const {getReservations, reservations} = useReservation()
  const { user } = useAuth()

  useEffect(() => {
    console.log(user)
    const fetchReservations = async () => {
      await getReservations(user.id)
    }
    fetchReservations()
    console.log(reservations)
    
  }, [])

  return (
    <div className="p-4">
      <h1 className='my-3 text-3xl font-bold italic'>LISTADO DE RESERVAS</h1>
      <div className="my-4">
      <Link to={`/add-reservation`}><button className='create w-full sm:w-auto font-semibold rounded'>REALIZAR RESERVA</button></Link>
      </div>
      {
        reservations && reservations.length === 0 && 
          <h2 className='text-2xl italic'>No tienes reservas.</h2>
      }
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {reservations && reservations.map(reservation => (
        <ReservationCard reservation={reservation} key={reservation._id} />
      ))}
      </div>
    </div>

  )
}

export default ReservationPage
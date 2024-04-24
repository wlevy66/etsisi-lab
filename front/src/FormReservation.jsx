import {useForm} from 'react-hook-form'
import { useReservation } from './context/ReservationContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
const FormReservation = () => {

  const { register, handleSubmit, errors } = useForm()
  const { addReservation, error, updateReservation } = useReservation()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const getReservationData = async() => {
      if(params.reservationId){
        const reservation = await getReservation(params.reservationId)
        console.log(reservation)
        setValue('name', reservation.name)
        setValue('capacity', reservation.capacity)
      }
    }
    getReservationData()
  }, [])

  const onSubmit = handleSubmit( async(data) => {
    if(params.reservationId){
      await updateReservation(params.reservationId, data)
    }
    else{
      await addReservation(data)
    }
    navigate('/dashboard')
  })
  return(
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <h1>Add reservation</h1>
      <form onSubmit={onSubmit}>
        <div>{error && <span>{error}</span>}</div>

        <input type='text' placeholder="User" 
          {...register('user')} autoFocus />
        <input type='text' placeholder="Schedule" 
          {...register('schedule')} />

        <button type='submit'>Add</button>
        <button onClick={(e) => {
          e.preventDefault()
          navigate(`/dashboard`)
        }}>Cancel</button>
      </form>
    </div>
  )
}

export default FormReservation
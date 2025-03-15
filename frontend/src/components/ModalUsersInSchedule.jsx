import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useReservation } from '@/context/ReservationContext'
import { useAuth } from '@/context/AuthContext'

const ModalUsersInSchedule = ({ reservations, open, onClose }) => {

  const { deleteReservation, error } = useReservation()
  const { user } = useAuth()

  const handleDeleteReservation = async (reservationId) => {
    await deleteReservation(user.id, reservationId)
  }
  return (
    <Modal open={open} onClose={onClose} center closeOnEsc styles={{ modal: { padding: '40px' } }}>
      <h1 className='font-bold italic text-xl text-left my-3'>USUARIOS EN ESTE HORARIO</h1>
      <ul className='list-disc px-2'>
        {

          reservations && reservations.length > 0 ?
            reservations.map(reservation => (
              <li className='py-5' key={reservation._id}>
                <div className='flex gap-5'>
                  <span className='mt-2'>{reservation.user.email}</span>
                  <button className='bg-red-600'
                    onClick={() => handleDeleteReservation(reservation._id)}>X</button>
                </div>
              </li>
            ))
            : <p className='text-2xl italic'>No hay usuarios en este horario.</p>
        }
      </ul>

      <div className='mb-4'>{error && <span className='error'>{error}</span>}</div>
    </Modal>
  )
}

export default ModalUsersInSchedule
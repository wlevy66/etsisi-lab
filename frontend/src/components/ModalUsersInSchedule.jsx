import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

const ModalUsersInSchedule = ({ reservations, open, onClose }) => {
    return (
      <Modal open={open} onClose={onClose} center styles={{ modal: { padding: '40px' } }}>
        <h1 className='font-bold italic text-xl text-left my-3'>USUARIOS EN ESTE HORARIO</h1>
        <ul className='list-disc px-2'>
            {
                reservations.length > 0 ?
                reservations.map(reservation => (
                    <li key={reservation._id}>{reservation.user.email}</li>
                ))
                : <p className='text-2xl italic'>No hay usuarios en este horario.</p>
            }
        </ul>
      </Modal>
    )
}

export default ModalUsersInSchedule
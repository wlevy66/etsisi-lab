import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
const ModalUsers = ({ reservations, open, onClose }) => {
    return (
      <Modal open={open} onClose={onClose} center>
        <h2 className='text-2xl font-bold my-3'>Usuarios en este horario</h2>
        <ul className='list-disc mx-2'>
            {
                reservations.length > 0 ?
                reservations.map(reservation => (
                    <li key={reservation._id}>{reservation.user.email}</li>
                ))
                : <p>No hay usuarios en este horario</p>
            }
        </ul>
      </Modal>
    )
}

export default ModalUsers
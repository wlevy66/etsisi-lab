import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

const ModalConfirmAction = ({ open, onClose, onConfirm, message }) => {
    return (
        <Modal open={open} onClose={onClose} center closeOnEsc styles={{ modal: { padding: '20px' } }}>
            <h1 className='font-bold italic text-xl text-left my-3'>Confirmar acción</h1>
            <p className='text-lg italic'>{message}</p>
            <div className='flex justify-end gap-5 mt-5'>
                <button className='cancel' onClick={onClose}>CANCELAR</button>
                <button className='submit' onClick={onConfirm}>CONFIRMAR</button>
            </div>
        </Modal>
    )
}

export default ModalConfirmAction
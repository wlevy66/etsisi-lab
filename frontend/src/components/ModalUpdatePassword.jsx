import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import ModalConfirmAction from './ModalConfirmAction'

const ModalUpdatePassword = ({ id, open, onClose }) => {

    const { register, handleSubmit } = useForm()
    const { updatePassword, error, success, setError, setSuccess } = useAuth()

    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)
    const [actionMessage, setActionMessage] = useState(null)

    const openModalConfirm = (actionType) => {
        setIsModalConfirmOpen(true)
        switch (actionType) {
            case 'update':
                setActionMessage('¿Estás seguro de actualizar la contraseña?')
                break
        }
    }

    useEffect(() => {
        setError(null)
        setSuccess(null)
    }, [])

    const handleUpdatePassword = handleSubmit(async (data) => {
        setError(null)
        await updatePassword(id, data)
        setIsModalConfirmOpen(false)
    })

    return (
        <Modal open={open} onClose={onClose} center styles={{ modal: { padding: '40px' } }}>
            <form className='80' onSubmit={(e) => e.preventDefault()}>
                <h1>CAMBIAR CONTRASEÑA</h1>

                <div className="mb-4">
                    <label htmlFor='current-password'>
                        Contraseña actual
                    </label>
                    <input type='password' id="current-password" placeholder="Contraseña actual"
                        {...register('currentPassword')} autoFocus />
                </div>

                <div className="mb-4">
                    <label htmlFor="new-password">
                        Contraseña nueva
                    </label>
                    <input type='password' id="new-password" placeholder="Contraseña nueva"
                        {...register('newPassword')} />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirm-password">
                        Confirmar contraseña nueva
                    </label>
                    <input type='password' id="confirm-password" placeholder="Confirmar contraseña nueva"
                        {...register('confirmPassword')} />
                </div>
                <div className="mb-4">{error && <span className='error'>{error}</span>}</div>
                <div className="mb-4">{success && <span className='success'>{success}</span>}</div>
                <div className="flex justify-between">
                    <button
                        onClick={() => openModalConfirm('update')}
                        className="submit">
                        ACTUALIZAR
                    </button>
                </div>

            </form>
            <ModalConfirmAction
                open={isModalConfirmOpen}
                onClose={() => setIsModalConfirmOpen(false)}
                onConfirm={handleUpdatePassword}
                message={actionMessage}
            />
        </Modal>
    )
}

export default ModalUpdatePassword
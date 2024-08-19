import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

const ModalUpdatePassword = ({ id, open, onClose }) => {

    const { register, handleSubmit } = useForm()
    const { updatePassword, error, success, setError, setSuccess } = useAuth()

    useEffect(() => {
        setError(null)
        setSuccess(null)
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        await updatePassword(id, data)
    })

    return (
        <Modal open={open} onClose={onClose} center styles={{ modal: { padding: '40px' } }}>
            <form onSubmit={onSubmit}>
                <h1 className='font-bold italic text-2xl mb-3 text-left'>CAMBIAR CONTRASEÑA</h1>
                <div className="mb-4">{error && <span className='error'>{error}</span>}</div>
                <div className="mb-4">{success && <span className='success'>{success}</span>}</div>
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor='current-password'>
                        Contraseña actual
                    </label>
                    <input type='password'
                        className="border rounded w-full p-2" id="current-password" placeholder="Contraseña actual"
                        {...register('currentPassword')} autoFocus />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="new-password">
                        Contraseña nueva
                    </label>
                    <input type='password'
                        className="border rounded w-full p-2" id="new-password" placeholder="Contraseña nueva"
                        {...register('newPassword')} autoFocus />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="confirm-password">
                        Confirmar contraseña nueva
                    </label>
                    <input type='password'
                        className="border rounded w-full p-2" id="confirm-password" placeholder="Confirmar contraseña nueva"
                        {...register('confirmPassword')} autoFocus />
                </div>

                <div className="flex justify-between">
                    <button className="submit" type="submit">
                        ACTUALIZAR
                    </button>
                </div>

            </form>
        </Modal>
    )
}

export default ModalUpdatePassword
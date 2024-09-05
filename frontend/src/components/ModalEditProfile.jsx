import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import ModalConfirmAction from './ModalConfirmAction'

const ModalEditProfile = ({ id, open, onClose }) => {

    const { register, handleSubmit, setValue } = useForm()
    const { getUser, updateProfile, success, error, setError, setSuccess } = useAuth()

    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)
    const [actionMessage, setActionMessage] = useState(null)

    const openModalConfirm = (actionType) => {
        setIsModalConfirmOpen(true)
        switch (actionType) {
            case 'update':
                setActionMessage('¿Estás seguro de actualizar este usuario?')
                break
        }
    }

    useEffect(() => {
        setError(null)
        setSuccess(null)
        const setProfileData = async () => {
            const userFound = await getUser(id)
            setValue('name', userFound.user.name)
            setValue('lastname', userFound.user.lastname)
            setValue('phone', userFound.user.phone)
            setValue('email', userFound.user.email)
        }
        setProfileData()
    }, [])

    const handleUpdateProfile = handleSubmit(async (data) => {
        delete data.email
        setError(null)
        await updateProfile(id, data)
        setIsModalConfirmOpen(false)
    })


    return (
        <Modal open={open} onClose={onClose} center styles={{ modal: { padding: '40px' } }}>
            <form className='w-80' onSubmit={(e) => e.preventDefault()}>
                <h1>EDITAR PERFIL</h1>
                <div className="mb-4">
                    <label htmlFor="name">
                        Nombre
                    </label>
                    <input id="name" type="text" placeholder="Nombre"
                        {...register('name')} />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="lastname">
                        Apellidos
                    </label>
                    <input id="lastname" type="text" placeholder="Apellidos"
                        {...register('lastname')} />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="phone">
                        Teléfono
                    </label>
                    <input id="phone" type="text" placeholder="Teléfono"
                        {...register('phone')} />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input type='email' id="email" placeholder="Email" disabled
                        {...register('email')} />
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
                onConfirm={handleUpdateProfile}
                message={actionMessage}
            />
        </Modal>
    )
}

export default ModalEditProfile
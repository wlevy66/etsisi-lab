import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

const ModalEditProfile = ({ id, open, onClose }) => {

    const { register, handleSubmit, setValue } = useForm()
    const { getUser, updateProfile, success, error } = useAuth()

    useEffect(() => {
        const setProfileData = async() => {
            const userFound = await getUser(id)
            setValue('name', userFound.user.name)
            setValue('lastname', userFound.user.lastname)
            setValue('phone', userFound.user.phone)
            setValue('email', userFound.user.email)
        }
        setProfileData()
    }, [])

    const onSubmit = handleSubmit( async(data) => {
        delete data.email
        await updateProfile(id, data)
    })

    return (
        <Modal open={open} onClose={onClose} center styles={{ modal: { padding: '40px' } }}>
            <form className='w-80' onSubmit={onSubmit}>
                <h1 className='font-bold italic text-2xl mb-3 text-left'>EDITAR PERFIL</h1>
                <div className="mb-4">{error && <span className='error'>{error}</span>}</div>
                <div className="mb-4">{success && <span className='success'>{success}</span>}</div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        {...register('name')}
                        className="border rounded w-full p-3 h-11 uppercase" id="name" type="text" placeholder="Nombre" />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="lastname">
                        Apellidos
                    </label>
                    <input
                        {...register('lastname')}
                        className="border rounded w-full p-3 h-11 uppercase" id="lastname" type="text" placeholder="Apellidos" />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="phone">
                        Teléfono
                    </label>
                    <input
                        {...register('phone')}
                        className="border rounded w-full p-3 h-11" id="phone" type="text" placeholder="Teléfono" />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="email">
                    Email
                    </label>
                    <input type='email'
                        {...register('email')}
                        className="border rounded w-full p-3 h-11" id="email" placeholder="Email" disabled/>
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

export default ModalEditProfile
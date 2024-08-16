import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

const ModalEditProfile = ({ user, open, onClose }) => {

    const { register, handleSubmit, setValue } = useForm()
    const { getUser, updateUser } = useAuth()

    useEffect(() => {
        const setProfileData = async() => {
            const userFound = await getUser(user.id)
            console.log(user)
            setValue('email', userFound.user.email)
        }
        setProfileData()
    }, [])

    const onSubmit = handleSubmit( async(data) => {
        //await updateUser(user._id, data)
        console.log(data)
    })

    return (
        <Modal open={open} onClose={onClose} center styles={{ modal: { padding: '40px' } }}>
            <form onSubmit={onSubmit}>
                <h1 className='font-bold italic text-2xl mb-3 text-left'>EDITAR PERFIL</h1>
                {/* <div>{error && <span className='error'>{error}</span>}</div> */}
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="email">
                    Email
                    </label>
                    <input type='email'
                    className="border rounded w-full p-2" id="email" placeholder="Email"
                    {...register('email')} autoFocus />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="email">
                    Email
                    </label>
                    <input type='email'
                    className="border rounded w-full p-2" id="email" placeholder="Email"
                    {...register('email')} autoFocus />
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
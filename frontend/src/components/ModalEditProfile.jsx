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
        <Modal open={open} onClose={onClose} center>
            <form onSubmit={onSubmit}>
                
                {/* <div>{error && <span className='text-red-600'>{error}</span>}</div> */}
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
                </label>
                <input type='email'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="email" placeholder="Email"
                {...register('email')} autoFocus />

                <div className="flex items-center justify-between my-2">
                    <button className="bg-blue-500 rounded hover:bg-blue-700 text-white font-bold py-2 px-4" type="submit">
                        Actualizar
                    </button>
                </div>

            </form>
        </Modal>
      )
}

export default ModalEditProfile
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

const ModalProfile = ({ user, open, onClose }) => {

    const { register, handleSubmit, setValue } = useForm()
    const { getUser, updateUser } = useAuth()

    useEffect(() => {
        const getRoomData = () => {
            //const user = await getUser(id)
            console.log(user)
            setValue('email', user.email)
            setValue('role', user.role)
            setValue('status', user.status)
        }
        getRoomData()
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="email" placeholder="Nombre del aula"
                {...register('email')} autoFocus />
                <label className="block my-2 text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Rol
                </label>
                <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="role" placeholder="Capacidad"
                {...register('role')}>
                    <option value="admin">Admin</option>
                    <option value="professor">Professor</option>
                    <option value="student">Student</option>
                </select>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                Estado
                </label>
                <input type='text'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="status" placeholder="Nombre del aula"
                {...register('status')} />

                <div className="flex items-center justify-between my-2">
                    <button className="bg-blue-500 rounded hover:bg-blue-700 text-white font-bold py-2 px-4" type="submit">
                        Actualizar
                    </button>
                </div>

            </form>
        </Modal>
      )
}

export default ModalProfile
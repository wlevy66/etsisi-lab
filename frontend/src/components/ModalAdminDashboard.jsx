import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

const ModalAdminDashboard = ({ user, open, onClose }) => {

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
        <Modal open={open} onClose={onClose} center styles={{ modal: { padding: '40px' } }}>
            <form onSubmit={onSubmit}>
                <h1 className='font-bold italic text-2xl mb-3 text-left'>EDITAR PERFIL</h1>
                {/* <div>{error && <span className='error'>{error}</span>}</div> */}
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="email">
                    Email
                    </label>
                    <input type='email'
                    className="border rounded w-full p-2" id="email" placeholder="Nombre del aula"
                    {...register('email')} autoFocus />
                </div>

                <div className="mb-4">  
                    <label className="block text-md font-bold mb-2" htmlFor="role">
                    Rol
                    </label>
                    <select
                    className="border rounded w-full p-2" id="role" placeholder="Capacidad"
                    {...register('role')}>
                        <option value="admin">Admin</option>
                        <option value="professor">Professor</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="status">
                    Estado
                    </label>
                    <input type='text'
                    className="border rounded w-full p-2" id="status" placeholder="Nombre del aula"
                    {...register('status')} />
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

export default ModalAdminDashboard
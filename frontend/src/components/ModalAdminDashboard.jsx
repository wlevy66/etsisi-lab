import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { set, useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import { ROLES as roles } from '@/constants/rolesValues'
import { STATUS as status } from '@/constants/statusValues'

const ModalAdminDashboard = ({ id, open, onClose }) => {

    const { register, handleSubmit, setValue } = useForm()
    const { getUser, updateByAdmin, error, setError, success, setSuccess } = useAuth()

    useEffect(() => {
        setError(null)
        setSuccess(null)
        const getUserData = async() => {
            const response = await getUser(id)
            setValue('email', response.user.email)
            setValue('role', response.user.role)
            setValue('status', response.user.status)
        }
        getUserData()
    }, [id, open])

    const onSubmit = handleSubmit( async(data) => {
        await updateByAdmin(id, data)
    })

    return (
        <Modal open={open} onClose={onClose} center styles={{ modal: { padding: '40px' } }}>
            <form className='w-80' onSubmit={onSubmit}>
                <h1>EDITAR PERFIL</h1>

                <div className="mb-4">
                    <label htmlFor="email">
                    Email
                    </label>
                    <input type='email' id="email" placeholder="Email"
                    {...register('email')} autoFocus />
                </div>

                <div className="mb-4">  
                    <label htmlFor="role">
                    Rol
                    </label>
                    <select id="role" placeholder="Rol"
                    {...register('role')}>
                        {
                            roles.map( role => (
                                <option key={role.key} value={role.key}>{role.value}</option>
                            ))
                        }
                    </select>
                </div>
                
                <div className="mb-4">  
                    <label htmlFor="status">
                    Estado
                    </label>
                    <select id="status" placeholder="Estado"
                    {...register('status')}>
                        {
                            status.map( status => (
                                <option key={status.key} value={status.key}>{status.value}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="mb-4">{error && <span className='error'>{error}</span>}</div>
                <div className="mb-4">{success && <span className='success'>{success}</span>}</div>
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
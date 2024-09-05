import { useForm } from 'react-hook-form'
import { useRoom } from '@/context/RoomContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ModalConfirmAction from '@/components/ModalConfirmAction'

const FormRoom = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { createRoom, error, getRoom, updateRoom, success, setSuccess, setError } = useRoom()
    const navigate = useNavigate()
    const params = useParams()

    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)
    const [actionMessage, setActionMessage] = useState(null)

    const openModalConfirm = (actionType) => {
        setIsModalConfirmOpen(true)
        switch (actionType) {
            case 'create':
                setActionMessage('¿Estás seguro de crear el aula?')
                break
            case 'update':
                setActionMessage('¿Estás seguro de actualizar el aula?')
                break
        }
    }

    useEffect(() => {
        setError(null)
        setSuccess(null)
        const getRoomData = async () => {
            if (params.roomId) {
                const room = await getRoom(params.roomId)
                setValue('name', room.name)
                setValue('capacity', room.capacity)
            }
        }
        getRoomData()
    }, [])

    useEffect(() => {
        if (success) {
            navigate('/rooms')
        }
    }, [success])

    const onSubmit = handleSubmit(async (data) => {
        setError(null)
        if (params.roomId) {
            await updateRoom(params.roomId, data)
        }
        else {
            await createRoom(data)
        }
    })

    return (
        <form className='sm:w-full md:w-2/5 page' onSubmit={(e) => e.preventDefault()}>
            <h1>
                {
                    params.roomId ? 'ACTUALIZAR AULA' : 'CREAR AULA'
                }
            </h1>
            <div className="mb-4">
                <label htmlFor="name">
                    Nombre del aula
                </label>
                <input type='text' id="name" placeholder="Nombre del aula"
                    {...register('name')} autoFocus />
            </div>

            <div className="mb-4">
                <label htmlFor="capacity">
                    Capacidad
                </label>
                <input type='number' id="capacity" placeholder="Capacidad"
                    {...register('capacity')} />
            </div>
            <div className='mb-4'>{error && <span className='error'>{error}</span>}</div>
            <div className="flex items-center justify-center my-2 gap-2">
                <button onClick={(e) => {
                    e.preventDefault()
                    navigate(`/rooms`)
                }}
                    className='cancel'>
                    CANCELAR
                </button>

                <button className="submit"
                    onClick={() => openModalConfirm(params.roomId ? 'update' : 'create')}
                >
                    {
                        params.roomId ? 'ACTUALIZAR' : 'CREAR'
                    }
                </button>
            </div>
            <ModalConfirmAction
                open={isModalConfirmOpen}
                onClose={() => setIsModalConfirmOpen(false)}
                onConfirm={onSubmit}
                message={actionMessage}
            />
        </form>
    )
}

export default FormRoom
import { set, useForm } from 'react-hook-form'
import { useRoom } from '@/context/RoomContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const FormRoom = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { createRoom, error, getRoom, updateRoom, success } = useRoom()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
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
        if (params.roomId) {
            await updateRoom(params.roomId, data)
        }
        else {
            await createRoom(data)
        }
    })



    return (
        <form className='sm:w-full md:w-1/3 page' onSubmit={onSubmit}>
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

                <button className="submit" type="submit">
                    {
                        params.roomId ? 'ACTUALIZAR' : 'CREAR'
                    }
                </button>
            </div>
        </form>
    )
}

export default FormRoom
import {set, useForm} from 'react-hook-form'
import { useRoom } from '@/context/RoomContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const FormRoom = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { addRoom, error, getRoom, updateRoom, success } = useRoom()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const getRoomData = async() => {
            if(params.roomId){
                const room = await getRoom(params.roomId)
                setValue('name', room.name)
                setValue('capacity', room.capacity)
            }
        }
        getRoomData()
    }, [])

    useEffect(() => {
        if(success){
            navigate('/rooms')
        }
    }, [success])

    const onSubmit = handleSubmit( async(data) => {
        if(params.roomId){
            await updateRoom(params.roomId, data)
        }
        else{
            await addRoom(data)
        }
    })



    return(
            <form className='max-w-xs mx-auto mt-5 border-1 rounded p-8' onSubmit={onSubmit}>
                <h1 className='font-bold text-3xl mb-3 italic text-center'>
                    {
                        params.roomId ? 'ACTUALIZAR AULA' : 'CREAR AULA'
                    }
                </h1>
                <div className='mb-4'>{error && <span className='text-red-600 italic'>{error}</span>}</div>
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="name">
                    Nombre del aula
                    </label>
                    <input type='text'
                    className="border-1 rounded w-full p-2" id="name" placeholder="Nombre del aula"
                    {...register('name')} autoFocus />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="capacity">
                    Capacidad
                    </label>
                    <input type='number'
                    className="border-1 rounded w-full p-2" id="capacity" placeholder="Capacidad"
                    {...register('capacity')} />
                </div>

            <div className="flex items-center justify-center my-2 gap-2">
                <button onClick={(e) => {
                    e.preventDefault()
                    navigate(`/rooms`)
                }}
                className='bg-slate-500 hover:bg-slate-700 font-semibold py-2 px-4 rounded'>
                    CANCELAR
                </button>

                <button className="bg-blue-500 hover:bg-blue-700 font-semibold text-white py-2 px-4 rounded" type="submit">
                    {
                        params.roomId ? 'ACTUALIZAR' : 'CREAR'
                    }
                </button>
                
            </div>

            </form>
    )
}

export default FormRoom
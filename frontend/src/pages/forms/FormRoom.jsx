import {set, useForm} from 'react-hook-form'
import { useRoom } from '@/context/RoomContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const FormRoom = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { createRoom, error, getRoom, updateRoom, success } = useRoom()
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
            await createRoom(data)
        }
    })



    return(
            <form className='sm:w-full md:w-1/3 mx-auto border rounded p-4 mt-6' onSubmit={onSubmit}>
                <h1 className='font-bold italic text-3xl my-3 text-left'>
                    {
                        params.roomId ? 'ACTUALIZAR AULA' : 'CREAR AULA'
                    }
                </h1>
                <div className='mb-4'>{error && <span className='error'>{error}</span>}</div>
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="name">
                    Nombre del aula
                    </label>
                    <input type='text'
                    className="border rounded w-full p-2" id="name" placeholder="Nombre del aula"
                    {...register('name')} autoFocus />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="capacity">
                    Capacidad
                    </label>
                    <input type='number'
                    className="border rounded w-full p-2" id="capacity" placeholder="Capacidad"
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

                <button className="bg-blue-500 rounded hover:bg-blue-700 font-semibold text-white py-2 px-4" type="submit">
                    {
                        params.roomId ? 'ACTUALIZAR' : 'CREAR'
                    }
                </button>
                
            </div>

            </form>
    )
}

export default FormRoom
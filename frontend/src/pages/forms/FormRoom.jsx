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
        <div className="w-full max-w-xs mx-auto mt-5">
            <h1 className='font-bold text-3xl mb-1'>
                {
                    params.roomId ? 'Actualizar aula' : 'Crear aula'
                }
            </h1>
            <form onSubmit={onSubmit}>
                <div>{error && <span className='text-red-600'>{error}</span>}</div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre del aula
                </label>
                <input type='text'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="name" placeholder="Nombre del aula"
                {...register('name')} autoFocus />
                <label className="block my-2 text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                Capacidad
                </label>
                <input type='number'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="capacity" placeholder="Capacidad"
                {...register('capacity')} />

            <div className="flex items-center justify-between my-2">
                <button onClick={(e) => {
                    e.preventDefault()
                    navigate(`/rooms`)
                }}
                className='bg-slate-500 hover:bg-slate-700  py-2 px-4 rounded'>
                    Cancelar
                </button>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    {
                        params.roomId ? 'Actualizar' : 'Crear'
                    }
                </button>
                
            </div>

            </form>
        </div>
    )
}

export default FormRoom
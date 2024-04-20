import {useForm} from 'react-hook-form'
import { useRoom } from './context/RoomContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const FormRoom = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { addRoom, error, getRoom, updateRoom } = useRoom()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const getRoomData = async() => {
            if(params.roomId){
                const room = await getRoom(params.roomId)
                console.log(room)
                setValue('name', room.name)
                setValue('capacity', room.capacity)
            }
        }
        getRoomData()
    }, [])

    const onSubmit = handleSubmit( async(data) => {
        if(params.roomId){
            await updateRoom(params.roomId, data)
        }
        else{
            await addRoom(data)
        }
        navigate('/dashboard')
    })
    return(
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <h1>Add room</h1>
            <form onSubmit={onSubmit}>
                <div>{error && <span>{error}</span>}</div>

                <input type='text' placeholder="Room name" 
                {...register('name')} autoFocus />
                <input type='number' placeholder="Capacity" 
                {...register('capacity')} />

                <button type='submit'>Add</button>
                <button onClick={() => { navigate(-1) }}>Cancel</button>
            </form>
        </div>
    )
}

export default FormRoom
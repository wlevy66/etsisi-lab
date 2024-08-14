import {useForm} from 'react-hook-form'
import { useSchedule } from '@/context/ScheduleContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const FormSchedule = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { addSchedule, error, getSchedule, updateSchedule, success } = useSchedule()
    const navigate = useNavigate()
    const params = useParams()
    const minDateValue = () => {
        const today = new Date()
        const minDate = new Date(today)
        minDate.setDate(minDate.getDate() + 1)
        const day = String(minDate.getDate()).padStart(2, '0')
        const month = String(minDate.getMonth() + 1).padStart(2, '0')
        const year = minDate.getFullYear();
        return `${year}-${month}-${day}`
    }

    useEffect(() => {
        console.log(minDateValue())
        document.getElementById('day').setAttribute('min', minDateValue())
    }, [])

    useEffect(() => {
        const getScheduleData = async() => {
            const schedule = await getSchedule(params.roomId, params.scheduleId)
            setValue('day', dayjs.utc(schedule.day).format('YYYY-MM-DD'))
            setValue('start', dayjs.utc(schedule.start).format('HH:mm'))
            setValue('end', dayjs.utc(schedule.end).format('HH:mm'))
        }
        if(params.scheduleId) getScheduleData()
    }, [params.scheduleId])

    useEffect(() => {
        if(success){
            navigate(`/schedules/${params.roomId}`)
        }
    }, [success])

    const onSubmit = handleSubmit( async(data) => {
            if(params.scheduleId){
                await updateSchedule(params.scheduleId, {
                    day: dayjs.utc(data.day).format(),
                    start: dayjs.utc(`${data.day} ${data.start}`, 'YYYY-MM-DD HH:mm').format(),
                    end: dayjs.utc(`${data.day} ${data.end}`, 'YYYY-MM-DD HH:mm').format()
                })
            }
            else{
                await addSchedule({
                    room: params.roomId,
                    day: dayjs.utc(data.day).format(),
                    start: dayjs.utc(`${data.day} ${data.start}`, 'YYYY-MM-DD HH:mm').format(),
                    end: dayjs.utc(`${data.day} ${data.end}`, 'YYYY-MM-DD HH:mm').format()
                })
            }   
    })
    return(
        <div className="w-full max-w-xs mx-auto mt-5">
            <h1 className='font-bold text-3xl mb-1'>
                { params.scheduleId ? 'Actualizar horario' : 'Crear horario' }
            </h1>
            <form onSubmit={onSubmit}>
                <div>{error && <span className='text-red-600'>{error}</span>}</div>

                <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="day">
                Fecha
                </label>
                <input type='date'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="day"
                {...register('day')} autoFocus />

                <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="start">
                Hora de inicio
                </label>
                <input type='time'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="start"
                {...register('start')} />

                <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="end">
                Hora de fin
                </label>
                <input type='time'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="end" 
                {...register('end')} />

                <div className="flex items-center justify-between my-2">
                    <button onClick={(e) => {
                        e.preventDefault()
                        navigate(`/schedules/${params.roomId}`) 
                    }}
                    className='bg-slate-500 hover:bg-slate-700  py-2 px-4 rounded'>
                        Cancelar
                    </button>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                        {
                            params.scheduleId ? 'Actualizar' : 'Crear'
                        }
                    </button>
                
                </div>
            </form>
        </div>
    )
}

export default FormSchedule
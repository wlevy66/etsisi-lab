import {useForm} from 'react-hook-form'
import { useSchedule } from '@/context/ScheduleContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const FormSchedule = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { createSchedule, error, getSchedule, updateSchedule, success } = useSchedule()
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
                await createSchedule({
                    room: params.roomId,
                    day: dayjs.utc(data.day).format(),
                    start: dayjs.utc(`${data.day} ${data.start}`, 'YYYY-MM-DD HH:mm').format(),
                    end: dayjs.utc(`${data.day} ${data.end}`, 'YYYY-MM-DD HH:mm').format()
                })
            }   
    })
    return(
            <form className='sm:w-full md:w-1/3 mx-auto border rounded p-4 mt-6' onSubmit={onSubmit}>
                <h1 className='font-bold italic text-3xl my-3 text-left'>
                    { params.scheduleId ? 'ACTUALIZAR HORARIO' : 'CREAR HORARIO' }
                </h1>
                <div className='mb-4'>{error && <span className='error'>{error}</span>}</div>
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="day">
                    Fecha
                    </label>
                    <input type='date'
                    className="border rounded w-full p-2" id="day"
                    {...register('day')} autoFocus />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="start">
                    Hora de inicio
                    </label>
                    <input type='time'
                    className="border rounded w-full p-2" id="start"
                    {...register('start')} />
                </div>
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="end">
                    Hora de fin
                    </label>
                    <input type='time'
                    className="border rounded w-full p-2" id="end" 
                    {...register('end')} />
                </div>

                <div className="flex items-center justify-center my-2 gap-2">
                    <button onClick={(e) => {
                        e.preventDefault()
                        navigate(`/schedules/${params.roomId}`) 
                    }}
                    className='bg-slate-500 hover:bg-slate-700 font-semibold py-2 px-4 rounded'>
                        CANCELAR
                    </button>

                    <button className="bg-blue-500 rounded hover:bg-blue-700 font-semibold text-white py-2 px-4" type="submit">
                        {
                            params.scheduleId ? 'ACTUALIZAR' : 'CREAR'
                        }
                    </button>
                
                </div>
            </form>
    )
}

export default FormSchedule
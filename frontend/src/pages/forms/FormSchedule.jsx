import { useForm } from 'react-hook-form'
import { useSchedule } from '@/context/ScheduleContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { minDateValue } from "@/utils/util"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const FormSchedule = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { createSchedule, error, getSchedule, updateSchedule, success } = useSchedule()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        document.getElementById('day').setAttribute('min', minDateValue())
    }, [])

    useEffect(() => {
        const getScheduleData = async () => {
            const schedule = await getSchedule(params.roomId, params.scheduleId)
            setValue('day', dayjs.utc(schedule.day).format('YYYY-MM-DD'))
            setValue('start', dayjs.utc(schedule.start).format('HH:mm'))
            setValue('end', dayjs.utc(schedule.end).format('HH:mm'))
        }
        if (params.scheduleId) getScheduleData()
    }, [params.scheduleId])

    useEffect(() => {
        if (success) {
            navigate(`/schedules/${params.roomId}`)
        }
    }, [success])

    const onSubmit = handleSubmit(async (data) => {
        if (params.scheduleId) {
            await updateSchedule(params.scheduleId, {
                day: dayjs.utc(data.day).format(),
                start: dayjs.utc(`${data.day} ${data.start}`, 'YYYY-MM-DD HH:mm').format(),
                end: dayjs.utc(`${data.day} ${data.end}`, 'YYYY-MM-DD HH:mm').format()
            })
        }
        else {
            await createSchedule({
                room: params.roomId,
                day: dayjs.utc(data.day).format(),
                start: dayjs.utc(`${data.day} ${data.start}`, 'YYYY-MM-DD HH:mm').format(),
                end: dayjs.utc(`${data.day} ${data.end}`, 'YYYY-MM-DD HH:mm').format()
            })
        }
    })
    return (
        <form className='sm:w-full md:w-1/3 page' onSubmit={onSubmit}>
            <h1>
                {params.scheduleId ? 'ACTUALIZAR HORARIO' : 'CREAR HORARIO'}
            </h1>
            <div className="mb-4">
                <label htmlFor="day">
                    Fecha
                </label>
                <input type='date' id="day"
                    {...register('day')} autoFocus />
            </div>

            <div className="mb-4">
                <label htmlFor="start">
                    Hora de inicio
                </label>
                <input type='time' id="start"
                    {...register('start')} />
            </div>

            <div className="mb-4">
                <label htmlFor="end">
                    Hora de fin
                </label>
                <input type='time' id="end"
                    {...register('end')} />
            </div>
            <div className='mb-4'>{error && <span className='error'>{error}</span>}</div>
            <div className="flex items-center justify-center my-2 gap-2">
                <button onClick={(e) => {
                    e.preventDefault()
                    navigate(`/schedules/${params.roomId}`)
                }}
                    className='cancel'>
                    CANCELAR
                </button>

                <button className="submit" type="submit">
                    {
                        params.scheduleId ? 'ACTUALIZAR' : 'CREAR'
                    }
                </button>
            </div>
        </form>
    )
}

export default FormSchedule
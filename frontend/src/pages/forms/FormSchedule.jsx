import { useForm } from 'react-hook-form'
import { useSchedule } from '@/context/ScheduleContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { minDateValue } from "@/utils/util"
import ModalConfirmAction from '@/components/ModalConfirmAction'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const FormSchedule = () => {

    const { register, handleSubmit, setValue, reset } = useForm()
    const { createSchedule, error, getSchedule, updateSchedule, success, setSuccess, setError } = useSchedule()
    const navigate = useNavigate()
    const params = useParams()

    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)
    const [actionMessage, setActionMessage] = useState(null)

    const openModalConfirm = (actionType) => {
        setIsModalConfirmOpen(true)
        switch (actionType) {
            case 'create':
                setActionMessage('¿Estás seguro de crear el horario?')
                break
            case 'update':
                setActionMessage('¿Estás seguro de actualizar el horario?')
                break
        }
    }

    useEffect(() => {
        document.getElementById('day').setAttribute('min', minDateValue())
    }, [])

    useEffect(() => {
        setError(null)
        setSuccess(null)
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
            reset()
        }
    }, [success])

    const onSubmit = handleSubmit(async (data) => {
        setError(null)
        setSuccess(null)
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
        setIsModalConfirmOpen(false)
    })

    return (
        <form className='sm:w-full md:w-2/5 page' onSubmit={(e) => e.preventDefault()}>
            <h1>{ params.scheduleId ? 'ACTUALIZAR HORARIO' : 'CREAR HORARIO' }</h1>
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
            <div className='mb-4'>{success && <span className='success'>{success}</span>}</div>
            <div className="flex items-center justify-center my-2 gap-2">
                <button onClick={(e) => {
                    e.preventDefault()
                    navigate(`/schedules/${params.roomId}`)
                }}
                    className='cancel'>
                    VOLVER
                </button>

                <button className="submit"
                    onClick={() => openModalConfirm(params.scheduleId ? 'update' : 'create')}
                >
                    {
                        params.scheduleId ? 'ACTUALIZAR' : 'CREAR'
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

export default FormSchedule
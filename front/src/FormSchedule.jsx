import {useForm} from 'react-hook-form'
import { useSchedule } from './context/ScheduleContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const FormSchedule = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { addSchedule, error, getSchedule, updateSchedule } = useSchedule()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const getScheduleData = async() => {
            if(params.scheduleId){
                const schedule = await getSchedule(params.roomId, params.scheduleId)
                setValue('start', dayjs.utc(schedule.start).format('YYYY-MM-DDTHH:mm'))
                setValue('end', dayjs.utc(schedule.end).format('YYYY-MM-DDTHH:mm'))
            }
        }
        getScheduleData()
    }, [params.scheduleId])

    const onSubmit = handleSubmit( async(data) => {
            if(params.scheduleId){
                await updateSchedule(params.scheduleId, {
                    ...data,
                    start: dayjs.utc(data.start).format(),
                    end: dayjs.utc(data.end).format()
                })
            }
            else{
                await addSchedule({
                    ...data,
                    room: params.roomId,
                    start: dayjs.utc(data.start).format(),
                    end: dayjs.utc(data.end).format()
                })
            }   
        
        navigate(-1)
    })
    return(
        <div className="w-full max-w-xs mx-auto mt-5">
            <h1 className='font-bold text-3xl mb-1'>Crear horario</h1>
            <form onSubmit={onSubmit}>
                <div>{error && <span>{error}</span>}</div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start">
                Inicio
                </label>
                <input type='datetime-local'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="start" placeholder="Inicio" 
                {...register('start')} autoFocus />

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start">
                Fin
                </label>
                <input type='datetime-local'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="start" placeholder="Inicio" 
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
                        Crear
                    </button>
                
                </div>
            </form>
        </div>
    )
}

export default FormSchedule
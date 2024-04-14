import { getReservationsRequest } from './api/reservation'
import {getScheduleByRoomIdRequest } from './api/schedule'


export const dateToUTC = (date, hour) =>{
    const [year, month, day] = date.split('-')
    const [hours, minutes] = hour.split(':')

    const newDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`)

    return newDate.toISOString()
}

export const changeFormat = (isoDate) => {
    const dateToFormat = new Date(isoDate)
    
    const day = dateToFormat.getDate().toString().padStart(2,'0')
    const month = (dateToFormat.getMonth()+1).toString().padStart(2,'0')
    const year = dateToFormat.getFullYear()
    const date = `${day}-${month}-${year}`

    const hours = dateToFormat.getHours().toString().padStart(2,'0')
    const minutes = dateToFormat.getMinutes().toString().padStart(2,'0')
    const hour = `${hours}:${minutes}`

    return [date, hour]
  }

export const schedulesAvailable = async(userId, roomId) => {

    let userReservations = await getReservationsRequest(userId)
    let allReservationsByRoom = await getScheduleByRoomIdRequest(roomId)

    let userReservationIds = userReservations.reservations.map(reservation => reservation.schedule._id);

    let schedulesAvailable = allReservationsByRoom.schedules.filter(schedule => !userReservationIds.includes(schedule._id));

    return schedulesAvailable
}
const Reservation = require('./reservationModel')
const Schedule = require('../schedule/scheduleModel')

const getReservations = async (userId) => {
    try{
        const reservations = await Reservation.find({"user": userId})
        .populate({
            path:'user',
            select: '_id email'
        })
        .populate({
            path: 'schedule',
            select: '_id start end room',
            populate: {
                path: 'room',
                model: 'Room',
                select: 'name capacity'
            }
        })
    } catch(error){
        throw Error(error.message)
    }
}

module.exports = {
    getReservations
}
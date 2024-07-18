const userRoutes = require('../entities/user/userRoute')
const roomRoutes = require('../entities/room/roomRoute')
const scheduleRoutes = require('../entities/schedule/scheduleRoute')
const reservationRoutes = require('../entities/reservation/reservationRoute')

module.exports = (app) => {
    app.use('/api/user', userRoutes)
    app.use('/api/room', roomRoutes)
    app.use('/api/schedule', scheduleRoutes)
    app.use('/api/reservation', reservationRoutes)
}
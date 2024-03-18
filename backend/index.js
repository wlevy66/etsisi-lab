//import dependencies
const connection = require('./db')
const express = require('express')
const cors = require('cors')

//welcome message
console.log('API NODE social-network started')

//connect to db
connection().then( () => console.log('Connected to db'))

//create node server
const app = express()
const port = 3900

//configure cors
app.use(cors())

//convert data from body to js objects
app.use(express.json())
app.use(express.urlencoded({extended: true})) //any data is decoded in a js object

//load routes
const UserRoutes = require('./routes/user')
const RoomRoutes = require('./routes/room')
const ScheduleRoutes = require('./routes/schedule')
const ReservationRoutes = require('./routes/reservation')

app.use('/api/user', UserRoutes)
app.use('/api/room', RoomRoutes)
app.use('/api/schedule', ScheduleRoutes)
app.use('/api/reservation', ReservationRoutes)

//server ready to listen http request
app.listen(3900, () => {
    console.log(`Node server running in port: ${port}`)
})
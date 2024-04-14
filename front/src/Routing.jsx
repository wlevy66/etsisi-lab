import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Schedules from './Schedules'
import Dashboard from './Dashboard'
import FormRoom from './FormRoom'
import FormSchedule from './FormSchedule'
import Error from './Error'
import MyReservations from './MyReservations'
import Reservations from './Reservations'
import FormReservation from './FormReservation'
import Nav from './Nav'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import ProtectedRoute from './ProtectedRoute'

function Routing() {
    return (
        <BrowserRouter>
                <Routes>
                        <Route path='/login' element={<LoginPage />} />
                        <Route index element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        
                        <Route element={<ProtectedRoute />}>
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/add-room' element={<FormRoom />} />
                            <Route path='/edit-room/:roomId' element={<FormRoom />} />
                            <Route path='/schedules/:roomId' element={<Schedules />} />
                            <Route path='/add-schedule/:roomId' element={<FormSchedule />} />
                            <Route path='/edit-schedule/:roomId/:scheduleId' element={<FormSchedule />} />
                            <Route path='/my-reservations' element={<MyReservations />} />
                            <Route path='/add-reservation' element={<Reservations />} />
                            <Route path='/add-reservation/:roomId' element={<FormReservation />} />
                            <Route path='/edit-reservation/:reservationId' element={<Reservations />} />
                        </Route>
                        <Route path='*' element={<Error />}/>
                </Routes>
        </BrowserRouter>
    )
}

export default Routing;
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
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { RoomProvider } from './context/RoomContext'
import { ScheduleProvider } from './context/ScheduleContext'
import { ReservationProvider } from './context/ReservationContext'
import ProfessorRoutes from './ProfessorRoutes'
import RoomScheduleCard from './components/RoomScheduleCard'

function Routing() {
    return (
        <AuthProvider>
            <RoomProvider>
                <ScheduleProvider>
                    <ReservationProvider>
            <BrowserRouter>
                    <Nav />
                    <main className='container mx-auto px-10'>
                    <Routes>
                            <Route path='/login' element={<LoginPage />} />
                            <Route index element={<LoginPage />} />
                            <Route path='/register' element={<RegisterPage />} />
                            
                            <Route element={<ProtectedRoute />}>
                                <Route element={<ProfessorRoutes />}>
                                    <Route path='/dashboard' element={<Dashboard />} />
                                    <Route path='/add-room' element={<FormRoom />} />
                                    <Route path='/edit-room/:roomId' element={<FormRoom />} />
                                    <Route path='/schedules/:roomId' element={<Schedules />} />
                                    <Route path='/add-schedule/:roomId' element={<FormSchedule />} />
                                    <Route path='/edit-schedule/:roomId/:scheduleId' element={<FormSchedule />} />
                                </Route>
                                <Route path='/my-reservations' element={<MyReservations />} />
                                <Route path='/add-reservation' element={<RoomScheduleCard />} />
                                <Route path='/add-reservation/:roomId' element={<FormReservation />} />
                                <Route path='/edit-reservation/:reservationId' element={<RoomScheduleCard />} />
                            </Route>
                            <Route path='*' element={<Error />}/>
                    </Routes>
                    </main>
            </BrowserRouter>
            </ReservationProvider>
            </ScheduleProvider>
            </RoomProvider>
        </AuthProvider>
    )
}

export default Routing
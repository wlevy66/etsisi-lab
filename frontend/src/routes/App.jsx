import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"

import Nav from '@/components/common/Nav'
import Footer from '@/components/common/Footer'

import DashboardPage from '@/pages/DashboardPage'
import SchedulePage from '@/pages/SchedulePage'
import RoomPage from '@/pages/RoomPage'
import FormRoom from '@/pages/forms/FormRoom'
import FormSchedule from '@/pages/forms/FormSchedule'
import Error from '@/pages/Error'
import ReservationPage from '@/pages/ReservationPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import RoomScheduleCard from '@/components/RoomScheduleCard'

import ProtectedRoute from './ProtectedRoute'
import ProfessorRoute from './ProfessorRoute'
import AdminRoute from './AdminRoute'
import Header from '@/components/common/Header'

const App = () => {
    return (
        
        <BrowserRouter>
            <Header />
            <main className='mx-auto px-10'>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route index element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route element={<AdminRoute />}>
                            <Route path='/dashboard' element={<DashboardPage />} />
                        </Route>    
                        <Route element={<ProfessorRoute />}>
                            <Route path='/rooms' element={<RoomPage />} />
                            <Route path='/add-room' element={<FormRoom />} />
                            <Route path='/edit-room/:roomId' element={<FormRoom />} />
                            <Route path='/schedules/:roomId' element={<SchedulePage />} />
                            <Route path='/add-schedule/:roomId' element={<FormSchedule />} />
                            <Route path='/edit-schedule/:roomId/:scheduleId' element={<FormSchedule />} />
                        </Route>
                        <Route path='/reservations' element={<ReservationPage />} />
                        <Route path='/add-reservation' element={<RoomScheduleCard />} />
                        <Route path='/edit-reservation/:reservationId' element={<RoomScheduleCard />} />
                    </Route>
                    <Route path='*' element={<Error />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App
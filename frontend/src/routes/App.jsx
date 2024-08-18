import { BrowserRouter, Route, Routes } from "react-router-dom"

import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import ProfessorRoute from './ProfessorRoute'

import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import RoomPage from '@/pages/RoomPage'
import FormRoom from '@/pages/forms/FormRoom'
import SchedulePage from '@/pages/SchedulePage'
import FormSchedule from '@/pages/forms/FormSchedule'
import ReservationPage from '@/pages/ReservationPage'
import RoomScheduleCard from '@/components/RoomScheduleCard'
import Error from '@/pages/Error'

const App = () => {
    return (

        <BrowserRouter>
            <Header />
            <main className='px-10 flex-1'>
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/login' element={<LoginPage />} />
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
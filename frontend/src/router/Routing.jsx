import React from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Login from "../components/user/Login.jsx";
import Error from "../components/Error.jsx";
import Lab from "../components/user/Lab.jsx";
import PublicLayout from "../components/public/PublicLayout.jsx";
import PrivateLayout from "../components/private/PrivateLayout.jsx";
import Logout from "../components/user/Logout.jsx";
import Register from "../components/user/Register.jsx";
import {DashboardProvider} from "../context/DashboardContext.jsx";
import FormRoom from "../components/private/FormRoom.jsx";
import FormSchedule from "../components/private/FormSchedule.jsx";
import ScheduleList from '../components/private/ScheduleList.jsx';
import { StudentProvider } from '../context/StudentContext.jsx';
import ReservationList from '../components/private/ReservationList.jsx';
import FormReservation from '../components/private/FormReservation.jsx';

function Routing() {
    return (
        <DashboardProvider>
            <StudentProvider>
        <BrowserRouter>
                <Routes>

                    <Route path='/' element={<PublicLayout />} >
                        <Route index element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                    </Route>


                        <Route path="/lab" element={<PrivateLayout />} >
                            <Route index element={<Lab />} />
                            <Route path='lab' element={<Lab />} />
                            <Route path='logout' element={<Logout />} />
                            <Route path='add-room' element={<FormRoom />} />
                            <Route path='edit-room/:id' element={<FormRoom />} />
                            <Route path='add-schedule' element={<FormSchedule />} />
                            <Route path='edit-schedule/:id' element={<FormSchedule />} />
                            <Route path='schedules/:id' element={<ScheduleList />} />
                            <Route path='add-reservation' element={<FormReservation />} />
                            <Route path='edit-reservation/:id' element={<FormReservation />} />
                            <Route path='reservations/:id' element={<ReservationList />} />
                        </Route>






                    <Route path='*' element={<Error />}/>
                </Routes>
        </BrowserRouter>
        </StudentProvider>
        </DashboardProvider>
    );
}

export default Routing;
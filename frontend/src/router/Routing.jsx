import React from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Login from "../components/user/Login.jsx";
import Error from "../components/Error.jsx";
import Lab from "../components/user/Lab.jsx";
import PublicLayout from "../components/public/PublicLayout.jsx";
import PrivateLayout from "../components/private/PrivateLayout.jsx";
import Logout from "../components/user/Logout.jsx";
import Register from "../components/user/Register.jsx";

function Routing(props) {
    return (
        <BrowserRouter>
                <Routes>

                    <Route path='/' element={<PublicLayout />} >
                        <Route index element={<Login />} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                    </Route>


                    <Route path='/lab' element={<PrivateLayout />} >
                        <Route index element={<Lab />} />
                        <Route path='lab' element={<Lab />} />
                        <Route path='logout' element={<Logout />} />
                    </Route>





                    <Route path='*' element={<Error />}/>
                </Routes>
        </BrowserRouter>
    );
}

export default Routing;
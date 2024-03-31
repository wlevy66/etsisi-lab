import React from 'react';
import Header from "./Header.jsx";
import {Navigate, Outlet} from "react-router-dom";

function PrivateLayout(props) {

    let user = localStorage.getItem('user')
    return (
        <>
            {user ?
                <> 
                <Header />
                <Outlet />
                </> 
                : <Navigate to='/login' />
            }
        </>
    )
}

export default PrivateLayout
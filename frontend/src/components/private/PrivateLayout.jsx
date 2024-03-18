import React from 'react';
import Header from "./Header.jsx";
import {Navigate, Outlet} from "react-router-dom";

function PrivateLayout(props) {

    let user = localStorage.getItem('user')
    return (
        <>
            <Header />
            <section className='layout__content'>
                {user ? <Outlet />
                    : <Navigate to='/login' />
                }
            </section>
        </>
    );
}

export default PrivateLayout;
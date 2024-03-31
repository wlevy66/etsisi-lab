import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import Header from './Header.jsx'
function PublicLayout(props) {

    let user = localStorage.getItem('user')
    return (
        <>
            <Header />
            <section className='layout__content'>
                {!user ? <Outlet />
                    : <Navigate to='/lab' />
                }
            </section>
        </>
    )
}

export default PublicLayout
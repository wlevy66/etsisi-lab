import React from 'react';
import {NavLink} from "react-router-dom";
import logo from "../../assets/logo.png";

function Nav(props) {
    return (
    <>

        <nav className="navbar border-bottom">
            <div className="container-fluid">
                <NavLink to='/lab' className='col-md-5'>
                    <img src={logo} width="30%" height="30%" alt=""/>
                </NavLink>
                <form className="d-flex">
                    <NavLink to='/lab/add-room'>
                        <button className="btn btn-primary me-2">Add room</button>
                    </NavLink>
                    <NavLink to='/lab/add-schedule'>
                        <button className="btn btn-primary me-2">Add schedule</button>
                    </NavLink>
                    <NavLink to='/lab/logout'>
                        <button className="btn btn-primary me-2">Logout</button>
                    </NavLink>
                </form>
            </div>
        </nav>

    </>
    );
}

export default Nav;
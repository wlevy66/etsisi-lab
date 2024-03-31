import React from 'react';
import {NavLink} from "react-router-dom";
import logo from '../../assets/logo.png';
import '../../assets/style.css';

function Nav() {
    return (
        <>

            <nav className="navbar border-bottom">
                <div className="container-fluid">
                    <NavLink to='/login' className='col-md-5'>
                        <img src={logo} width="30%" height="30%" alt=""/>
                    </NavLink>
                    <form className="d-flex">
                        <NavLink to='/login'>
                            <button className="btn btn-link me-2">Sign in</button>
                        </NavLink>
                        <NavLink to='/register'>
                            <button className="btn btn-link">Register</button>
                        </NavLink>
                    </form>
                </div>
            </nav>

        </>
    );
}

export default Nav;
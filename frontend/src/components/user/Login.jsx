import React, {useEffect} from 'react';
import {USERS} from '../../../public/data.js'
import {useNavigate} from "react-router-dom";
function Login(props) {

    useEffect(() => {
        //if(!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(USERS))
    }, [])
    const navigate = useNavigate()
    const signIn = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value


        let user = USERS.filter(user => user.username === username && user.password === password)
        if(user.length > 0){
            console.log('found')
            localStorage.setItem('user', JSON.stringify(user[0]))
            setTimeout(() => {
                navigate('/lab')
            }, 1000)
        }
    }

    return (
        <div className=' col-md-4 mx-auto'>
            <h4 className="text-center">Sign in into your account</h4>
            <form onSubmit={signIn} className="border-bottom">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control sm-3" id="username" name="username" autoFocus/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control sm-3 passwd" id="password" name="password"/>
                </div>
                <div className="text-center mb-2">
                    <button id="submit" type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>

    );
}

export default Login;
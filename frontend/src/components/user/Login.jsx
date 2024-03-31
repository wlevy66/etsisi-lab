import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { loginRequest } from '../../api/user.js';

function Login() {

    const navigate = useNavigate()
    const signIn = async (e) => {
        e.preventDefault()
        const email = e.target.username.value
        const password = e.target.password.value
        const response = await loginRequest({email, password})

        if(response.status === 200){
            let user = {
                id: response.id,
                email: response.email,
                role: response.role
            }
            console.log('found')
            localStorage.setItem('user', JSON.stringify(user))
            setTimeout(() => {
                navigate('/lab')
            }, 1000)
        }
        else{
            alert('Incorrect credentials')
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

    )
}

export default Login
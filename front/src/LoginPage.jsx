import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

function LoginPage() {

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
        <div className="container">
            <h1>Login</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default LoginPage
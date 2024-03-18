import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

function Logout(props) {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear()
        navigate('/login')
    }, []);
    return (
        <div>Logging out...</div>
    );
}

export default Logout;
import React from 'react';
import Professor from "../private/Professor.jsx";
import Student from "../private/Student.jsx";

function Lab(props) {
    const user = JSON.parse(localStorage.getItem('user')).role


    return (
        <>
            {user === 'professor'  ? <Professor /> : <Student />}
        </>

    )
}

export default Lab;
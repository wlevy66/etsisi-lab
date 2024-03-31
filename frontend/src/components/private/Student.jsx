import React from 'react';
import { useStudent } from '../../context/StudentContext';
import ReservationList from './ReservationList';
import RoomList from './RoomList'

const Student = (props) => {

    const {reservations} = useStudent()
    

    return (
        <div className="row mt-3 mb-3" id="main">
            <div className="col-md-3"></div>
            <div className="col-md-6 text-center" id="new">
                <h3 className="text-center text-decoration-underline">Classrooms available</h3>
                <ul className="list-group list-group-flush">
                    <RoomList />
                </ul>
            </div>
            <div className="col-md-3"></div>
        </div>
    );
}

export default Student;
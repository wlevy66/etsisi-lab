import React from 'react';
import { useStudent } from '../../context/StudentContext';

const Student = (props) => {

    const {reservations} = useStudent()
    

    return (
        <div className="row mt-3 mb-3" id="main">

            <div className="col-md-6 border-end text-center" id="new">
                <h3 className="text-center text-decoration-underline">Classrooms available</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item my-1">
                        <p>
                            <span className="fs-5">CIC 1 </span>
                            <span className="fs-5">0/5 </span>
                        </p>
                        <select className='mb-3'>
                            <option>14/03/2023 - 14:00</option>
                            <option>14/03/2023 - 17:00</option>
                            <option>15/03/2023 - 15:00</option>
                        </select>
                        <button type="button" className="btn btn-success btn-sm ms-2">reserve</button>

                    </li>
                    <li className="list-group-item my-1">
                        <p>
                            <span className="fs-5">CIC 2 </span>
                            <span className="fs-5">3/5 </span>
                        </p>
                        <select className='mb-3'>
                            <option>14/03/2023 - 14:00</option>
                            <option>14/03/2023 - 17:00</option>
                            <option>15/03/2023 - 15:00</option>
                        </select>
                        <button type="button" className="btn btn-success btn-sm ms-2">reserve</button>
                    </li>

                </ul>
            </div>
            <div className="col-md-6 border-end text-center" id="classrooms">
                <h3 className="text-center text-decoration-underline">Your reservations</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item my-1">
                        <p>
                            <span className="fs-5">CIC 1 </span>
                            <span className="fs-5">0/5 </span>
                        </p>

                        <p>
                            <span className="fs-5">Date </span>
                            <span className="fs-5">Hour </span>
                        </p>

                        <button type="button" className="btn btn-secondary btn-sm ms-2">update</button>
                        <button type="button" className="btn btn-danger btn-sm ms-2">delete</button>
                    </li>
                    <li className="list-group-item my-1">
                        <p>
                            <span className="fs-5">CIC 2 </span>
                            <span className="fs-5">3/5 </span>
                        </p>

                        <p>
                            <span className="fs-5">Date </span>
                            <span className="fs-5">Hour </span>
                        </p>
                        <button type="button" className="btn btn-secondary btn-sm ms-2">update</button>
                        <button type="button" className="btn btn-danger btn-sm ms-2">delete</button>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default Student;
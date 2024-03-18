import React, { useEffect, useState } from 'react';


import SchedueList from './ScheduleList'
import FormRoom from './FormRoom'
import FormReservation from './FormReservation'
import RoomList from './RoomList'
import {apiAddRoom, apiGetRooms} from '@/services/apiRoom'
import {apiAddSchedule, apiGetSchedules} from '@/services/apiSchedule'

function Professor() {
    const [rooms, setRooms] = useState([])
    const [schedules, setSchedules] = useState([]);

    const addRoom = async (newData) => {
      try {
        await apiAddRoom(newData);
  
        let newRooms = await apiGetRooms();
        setRooms(newRooms);
      } catch (error) {
        console.log('Error', error);
      }
    }

    const addSchedule = async (newData) => {
        try {
          await apiAddSchedule(newData);
    
          let newSchedules = await apiGetSchedules();
          setSchedules(newSchedules);
        } catch (error) {
          console.log('Error', error);
        }
      }


    return (
        <div className="row mt-3 mb-3" id="main">
            <div className="col-md-4 border-end text-center" id="new">
            <h3 className="text-center text-decoration-underline">List of rooms</h3>
                <ul className="list-group list-group-flush">
                    <RoomList rooms={rooms}/>
                </ul>
            </div>
            <div className="col-md-4 border-end text-center" id="rooms">
                <h3 className="text-center text-decoration-underline">Rooms and schedules available</h3>
                <ul className="list-group list-group-flush">
                    <SchedueList schedules={schedules} />
                </ul>
            </div>
            <div className="col-md-4 border-end text-center" id="new">
                <FormRoom addRoom={addRoom}/>
                <hr/>
                <FormReservation rooms={rooms} addSchedule={addSchedule} />
            </div>

        </div>
    );
}

export default Professor;
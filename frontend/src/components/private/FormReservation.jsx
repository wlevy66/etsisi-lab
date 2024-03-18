
import React, { useState, useEffect } from 'react'
import {apiGetRooms} from '@/services/apiRoom'

const FormReservation = ({rooms, addSchedule}) => {
    const [localRooms, setLocalRooms] = useState([])

    useEffect(() => {
      const fetchRooms = async () => {
        try {
          let response = await apiGetRooms()
          setLocalRooms(response)
        } catch (error) {
          console.log('Error: ', error)
        }
      }
      
      fetchRooms()
    }, [rooms])

    const handleAddSchedule = async(e) => {
        e.preventDefault()
        const newData = {
            room: e.target.room.value
        }
        await addSchedule(newData)
    }
    
  return (
    <>
        <h3 className="text-center text-decoration-underline">Add new schedule</h3>
        <form onSubmit={handleAddSchedule}>
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="room">Room</label>
            <select className="form-select" id="room" name='room'>
            {
                localRooms.map ( (room) => {
                    return (
                        <option key={room._id} value={room._id}>{room.name}</option>
                    )
                })
            }
            </select>
        </div>

        <div className="form-group row mb-3">
            <label htmlFor="start" className="col-md-4 col-form-label">Start</label>
            <div className="col-md-8">
                <input type="datetime-local" className="form-control" id="start"/>
            </div>
        </div>
        <div className="form-group row mb-3">
            <label htmlFor="end" className="col-md-4 col-form-label">End</label>
            <div className="col-md-8">
                <input type="datetime-local" className="form-control" id="end"/>
            </div>
        </div>
        <div className="text-center mb-2">
                <button id="submit" type="submit" className="btn btn-primary">Add</button>
        </div>
        </form>
    </>


  );
};

export default FormReservation;

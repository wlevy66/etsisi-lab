import { useEffect } from 'react'
import {useDashboard} from "../../context/DashboardContext.jsx";


const FormSchedule = () => {

    const {createSchedule, rooms, getRooms} = useDashboard()

    useEffect(() => {
        getRooms()
    }, [])

    const handleAddSchedule = async(e) => {
        e.preventDefault()
        const newData = {
            room: e.target.room.value
        }
        await createSchedule(newData)
    }
    
  return (
    <>
        <h3 className="text-center text-decoration-underline">Add new schedule</h3>
        <form onSubmit={handleAddSchedule}>
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="room">Room</label>
            <select className="form-select" id="room" name='room'>
            {
                rooms.map ( (room) => {
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

export default FormSchedule;

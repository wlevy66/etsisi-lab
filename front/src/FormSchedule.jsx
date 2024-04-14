import { useNavigate, useParams } from 'react-router-dom'
import {dateToUTC} from './util'
import {createScheduleRequest, updateScheduleRequest} from './api/schedule'

const FormSchedule = () => {
    const params = useParams()
    const navigate = useNavigate()
    
    const handleAddSchedule = async(e) => {
        e.preventDefault()
        const date = e.target.date.value
        const start = e.target.start.value
        const end = e.target.end.value

        if(start < end){
            console.log(params)
            const newData = {
                room: params.roomId,
                start: dateToUTC(date, start),
                end: dateToUTC(date, end)
            }
            if(params.scheduleId){
                updateScheduleRequest(params.scheduleId, newData)
            }
            else{
                createScheduleRequest(newData)
                console.log(newData)
            }
            navigate(-1)
        }
        else{
            alert('Orden de fechas incorrectas')
        }
    }
    
  return (
    <>
        {
        (params.scheduleId) ? <h3 className="text-center text-decoration-underline">Edit schedule</h3>
                    : <h3 className="text-center text-decoration-underline">Add schedule</h3>
        } 
        <form onSubmit={handleAddSchedule}>
        <div className="form-group row mb-3">
            <label htmlFor="date" className="col-md-4 col-form-label" >Date</label>
            <div className="col-md-8">
                <input type="date" className="form-control" name="date" required />
            </div>
        </div>
        <div className="form-group row mb-3">
            <label htmlFor="start" className="col-md-4 col-form-label" >Start</label>
            <div className="col-md-8">
                <input type="time" className="form-control" name="start" required />
            </div>
        </div>
        <div className="form-group row mb-3">
            <label htmlFor="end" className="col-md-4 col-form-label">End</label>
            <div className="col-md-8">
                <input type="time" className="form-control" name="end" required />
            </div>
        </div>
        <div className="text-center mb-2">
            <button onClick={()=>navigate(-1)} className="btn btn-primary">Cancel</button>
            <button id="submit" type="submit" className="btn btn-primary">Save</button>
        </div>
        </form>
    </>


  );
}


export default FormSchedule
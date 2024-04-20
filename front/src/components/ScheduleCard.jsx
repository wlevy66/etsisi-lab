import { useParams, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const ScheduleCard = ({ schedule }) => {
    const params = useParams()
    const navigate = useNavigate()
    
    
    
    return (
        <div className="card mt-3">
            <div className="card-body">
                <h5 className="card-title">Schedule</h5>
                
                <p className="card-text">Start: { dayjs(schedule.start).utc().format('DD-MM-YYYY - HH:mm') }</p>
                <p className="card-text">End: { dayjs(schedule.end).utc().format('DD-MM-YYYY - HH:mm') }</p>
                <button className="btn btn-primary" onClick={() => navigate(`/schedule/${schedule.id}`)}>Edit</button>
                <button className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}

export default ScheduleCard
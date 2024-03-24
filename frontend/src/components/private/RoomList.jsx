import {useEffect} from 'react'
import {useDashboard} from "../../context/DashboardContext.jsx";
import {Link} from 'react-router-dom'
import RoomCard from './RoomCard.jsx';

const RoomList = () => {

  const {getRooms, rooms, deleteRoom} = useDashboard()


  useEffect(() => {
    getRooms()
  }, [])


  function handleRemove(id){
    deleteRoom(id)
  }

  return (
    <>
      {
        rooms.map((room) => (
            <li key={room._id} className="list-group-item my-1">
              <RoomCard room={room} />
              <Link to={`edit-room/${room._id}`}>
                <button type="button" className="btn btn-secondary btn-sm ms-2">update</button>
              </Link>
              <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleRemove(room._id)}>delete</button>
              <Link to={`schedules/${room._id}`}>
                <button type="button" className="btn btn-info btn-sm ms-2">see schedules</button>
              </Link>
            </li>
        ))
      }
    </>
  )
}

export default RoomList;

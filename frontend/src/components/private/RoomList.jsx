import {useEffect} from 'react'
import {useDashboard} from "../../context/DashboardContext.jsx";


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
              <strong>{room.name}</strong>
              <p>Capacidad: {room.capacity}</p>
              <button type="button" className="btn btn-secondary btn-sm ms-2">update</button>
              <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleRemove(room._id)}>delete</button>
            </li>
        ))
      }
    </>
  )
}

export default RoomList;

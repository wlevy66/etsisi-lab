import React, { useState, useEffect } from 'react'

import { apiGetRooms, apiRemoveRoom, apiUpdateRoom } from '@/services/apiRoom'

const RoomList = ({rooms}) => {
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

  const removeRoom = async (id) => {
    try {
      await apiRemoveRoom(id)
      //let newRooms = rooms.filter((room) => room._id !== id)
      let newRooms = await apiGetRooms()
      setLocalRooms(newRooms)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const updateRoom = async (id, newData) => {
    try {
      await apiUpdateRoom(id, newData)
      //let newRooms = rooms.map((room) =>room._id === id ? { ...room, ...newData } : room)
      let newRooms = await apiGetRooms()
      setLocalRooms(newRooms)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <>
      {
      localRooms.map((room) => (
          <li key={room._id} className="list-group-item my-1">
            <strong>{room.name}</strong>
            <p>Capacidad: {room.capacity}</p>
            <button type="button" className="btn btn-secondary btn-sm ms-2">update</button>
            <button type="button" className="btn btn-danger btn-sm ms-2" onClick={()=>removeRoom(room._id)}>delete</button>
          </li>
        ))
      }
    </>
  )
}

export default RoomList;

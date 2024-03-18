// RoomList.jsx

import React, { useState, useEffect } from 'react';
import { getRooms, removeRoom, updateRoom } from '@/services/apiRoom';

const RoomListTwo = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getRooms();
        setRooms(response);
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchRooms();
  }, []);

  const handleRemoveRoom = async (roomId) => {
    try {
      await removeRoom(roomId);
      const updatedRooms = rooms.filter((room) => room._id !== roomId);
      setRooms(updatedRooms);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleUpdateRoom = async (roomId, updatedData) => {
    try {
      await updateRoom(roomId, updatedData);
      const updatedRooms = rooms.map((room) =>
        room._id === roomId ? { ...room, ...updatedData } : room
      );
      setRooms(updatedRooms);
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <>
      {rooms.map((room) => (
        <li key={room._id} className="list-group-item my-1">
          <strong>{room.name}</strong>
          <p>Capacidad: {room.capacity}</p>
          <button
            type="button"
            className="btn btn-secondary btn-sm ms-2"
            onClick={() => handleUpdateRoom(room._id, { name: 'Updated Room Name' })}
          >
            update
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm ms-2"
            onClick={() => handleRemoveRoom(room._id)}
          >
            delete
          </button>
        </li>
      ))}
    </>
  );
};

export default RoomListTwo;

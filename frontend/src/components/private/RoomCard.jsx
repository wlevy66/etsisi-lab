const RoomCard = ({room}) => {
    return (
        <>
            <strong>{room.name}</strong>
            <p>Capacidad: {room.capacity}</p>
        </>
    )
}


export default RoomCard
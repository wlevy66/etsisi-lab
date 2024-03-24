

const ReservationCard = ({reservation}) => {

    return (
        <>
            <strong>{reservation.room.name}</strong>
            <p>Capacidad: {reservation.room.capacity}</p>
            <p>
            <span className="fs-5">{dateParser(reservation.start)} - </span>
            <span className="fs-5">{dateParser(reservation.end)} </span>
            </p>
    
        </>
    )

}

export default ReservationCard
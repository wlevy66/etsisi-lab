import RoomList from "./RoomList.jsx";
import ScheduleList from "./ScheduleList.jsx";

function Professor() {

    return (
        <div className="row mt-3 mb-3" id="main">
            <div className="col-md-6 border-end text-center" id="new">
            <h3 className="text-center text-decoration-underline">List of rooms</h3>
                <ul className="list-group list-group-flush">
                    <RoomList />
                </ul>
            </div>
            <div className="col-md-6 border-end text-center" id="rooms">
                <h3 className="text-center text-decoration-underline">Rooms and schedules available</h3>
                <ul className="list-group list-group-flush">
                    <ScheduleList />
                </ul>
            </div>

        </div>
    );
}

export default Professor;
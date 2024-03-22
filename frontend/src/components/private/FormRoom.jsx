import { useNavigate, useParams } from "react-router-dom";
import {useDashboard} from "../../context/DashboardContext.jsx";
import { useEffect } from "react";

const FormRoom = () => {
    const {createRoom, updateRoom} = useDashboard()
    const params = useParams()
    const navigate = useNavigate()
    useEffect( ()=> {

    }, [])

    const handleAddRoom = async(e) => {
        e.preventDefault()
        const newData = {
            name: e.target.name.value,
            capacity: e.target.capacity.value
        }
        if(params.id){
            console.log(params.id)
            updateRoom(params.id, newData)
        }
        else{
            createRoom(newData)
        }
        navigate('/lab')
    }
    
  return (
    <>
        {
        (params.id) ? <h3 className="text-center text-decoration-underline">Edit room</h3>
                    : <h3 className="text-center text-decoration-underline">Add room</h3>
        }       
        <form onSubmit={handleAddRoom}>
            <div className="form-group row mb-3">
                <label htmlFor="name" className="col-md-4 col-form-label">Name</label>
                <div className="col-md-8">
                    <input type="text" className="form-control" id="name"/>
                </div>
            </div>
            <div className="form-group row mb-3">
                <label htmlFor="capacity" className="col-md-4 col-form-label">Capacity</label>
                <div className="col-md-8">
                    <input type="number" min="1" className="form-control" id="capacity"/>
                </div>
            </div>
            <div className="text-center mb-2">
                <button id="submit" type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>
    </>


  );
};

export default FormRoom;

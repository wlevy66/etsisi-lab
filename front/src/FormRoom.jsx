import { useNavigate, useParams } from "react-router-dom";
import {createRoomRequest, updateRoomRequest} from './api/room'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from "react";

const FormRoom = () => {
 
    const params = useParams()
    const navigate = useNavigate()
    const [invalid, setInvalid] = useState(false)
    const [success, setSuccess] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    
    const handleCancel = () => {
        navigate(-1)
    }

    const handleRoom = async(e) => {
        e.preventDefault()
        const newData = {
            name: e.target.name.value,
            capacity: e.target.capacity.value
        }
        if(params.roomId){
            await updateRoomRequest(params.roomId, newData).then(response => {
                console.log(response)
                if(response.status !== 201){
                    setInvalid(true)
                    setResponseMessage(response.message)
                }
                else{
                    setInvalid(false)
                    setSuccess(true)
                    setResponseMessage(response.message)
                    setTimeout(() => {
                        navigate(-1)
                    }, 1000)
                }
            })
        }
        else{
            await createRoomRequest(newData).then(response => {
                console.log(response)
                if(response.status !== 201){
                    setInvalid(true)
                    setResponseMessage(response.error)
                }
                else{
                    setInvalid(false)
                    setSuccess(true)
                    setResponseMessage(response.message)
                    setTimeout(() => {
                        navigate(-1)
                    }, 1000)
                }
            })
            .catch(error => {
                console.log(error)
            })
        }

        
    }
    
  return (
    <>
        {
        (params.roomId) ? <h3 className="text-center text-decoration-underline mt-3">Edit room</h3>
                    : <h3 className="text-center text-decoration-underline mt-3">Add room</h3>
        }       
            <div className="row">
                <div className="col-md-4"></div>
                
                <div className="col-md-4">
                <form onSubmit={handleRoom}>
                    <div className="form-group row mb-3">
                        <label htmlFor="name" className="col-md-4 col-form-label">Name</label>
                        <div className="col-md-8">
                            <input type="text" className="form-control" name="name" />
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label htmlFor="capacity" className="col-md-4 col-form-label">Capacity</label>
                        <div className="col-md-8">
                            <input type="number" className="form-control" name="capacity" />
                        </div>
                    </div>

                    {success && 
                    <div className="form-group row mb-3 text-center">
                        <small className="text-success">{responseMessage}</small>
                    </div>
                    }
                    {invalid && 
                    <div className="form-group row mb-3 text-center">
                        <small className="text-danger">{responseMessage}</small>
                    </div>
                    }
                
                    <div className="text-center mb-2">
                        <button onClick={() => { navigate(-1) }} className="btn btn-primary mx-3">Cancel</button>
                        <button id="submit" type="submit" className="btn btn-primary mx-3">Save</button>
                    </div>
                </form>
                </div>

                <div className="col-md-4"></div>
            </div>

    </>


  );
};

export default FormRoom
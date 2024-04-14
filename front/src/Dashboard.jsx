import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {getRoomsRequest, deleteRoomRequest} from './api/room'

import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateIcon from '@mui/icons-material/Update'
const DashBoard = () => {

  const [rooms, setRooms] = useState([])
  const navigate = useNavigate()

  useEffect(() =>{
    getRoomsRequest().then(response => setRooms(response.rooms))
  }, [])

  const handleDeleteRoom = (id) => {
    deleteRoomRequest(id).then(() => {
      const newRooms = rooms.filter(room => room._id !== id)
      setRooms(newRooms)
    })
  }
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 250, renderCell: (row) => console.log(row)},
    { field: 'capacity', headerName: 'Capacity', width: 250 },
    { 
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      sortable: false,
      renderCell: (row) => (
        <>
          <Link to={`/edit-room/${row.id}`} >
            <Button variant="contained" color="primary" >Editar<UpdateIcon/></Button>
          </Link>
          <Link>
            <Button variant="contained" color="primary" onClick={() => handleDeleteRoom(row.id)}>Eliminar<DeleteIcon/></Button>
          </Link>
        </>
        
      ),
    },
    { 
      field: 'schedules',
      headerName: 'Schedules', 
      width: 200,
      sortable: false,
      renderCell: (row) => (
        <Button variant="contained" color="primary" onClick={() => navigate(`/schedules/${row.id}`)}>Ver horarios</Button>
      )
    }
  ]
    
      return (
        <>
        <div style={{width: '90%'}}>
        <h2 className='mt-3'>List of rooms</h2>
          <DataGrid
            rows={rooms}
            columns={columns}
            getRowId={(room) => room._id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            autoHeight
          />
          <Link to={'/add-room'}><button className='mt-3'>Add Room</button></Link>
        </div>
        </>
      )
}

export default DashBoard
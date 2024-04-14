import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {getRoomsRequest, deleteRoomRequest} from './api/room'

import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateIcon from '@mui/icons-material/Update'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import CardRoom from './CardRoom'

const Reservations = () => {

  const [rooms, setRooms] = useState([])
  const navigate = useNavigate()

  useEffect(() =>{
    getRoomsRequest().then(response => setRooms(response.rooms))
  }, [])

  
  const columns = [
    { field: 'name', headerName: 'Name', width: 250, renderCell: (row) => console.log(row)},
    { field: 'capacity', headerName: 'Capacity', width: 250 },
    { 
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      sortable: false,
      renderCell: (row) => (
        <>
          <Link to={`/edit-room/${row.id}`} >
            <Button variant="contained" color="primary">Editar<UpdateIcon/></Button>
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
      width: 250,
      sortable: false,
      renderCell: (row) => (
        <Button variant="contained" color="primary" onClick={() => navigate(`/schedules/${row.id}`)}>Ver horarios</Button>
      )
    }
  ]
    


    return (
        <>
        <button onClick={()=>navigate(-1)}><ArrowBackIcon /></button>
        <Box sx={{ flexGrow: 1 }} margin={{xs:3, md:5}}>
            <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {rooms.map((room, index) => (
                <CardRoom room={room} key={index}/>
            ))}
            </Grid>
        </Box>
        </>
    )

}

export default Reservations
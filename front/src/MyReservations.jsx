import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getReservationsRequest, deleteReservationRequest } from './api/reservation'

import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { changeFormat } from './util'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateIcon from '@mui/icons-material/Update'

const MyReservations = () => {

    const [reservations, setReservations] = useState([])
    const params = useParams()

    useEffect(()=>{
        getReservationsRequest('66009730078fcfc9d77de48a').then(response=>{
          console.log(response.reservations)
          setReservations(response.reservations)})
        
    }, [])
    const columns  = [
        { field: 'name', headerName: 'Name', width: 180,  valueGetter: (value, row) => {return `${row.schedule.room.name}`} },
        { field: 'day', headerName: 'Day', width: 180, valueGetter: (value, row) => {return changeFormat(row.schedule.start)[0]}, sortable: false},
        { field: 'start', headerName: 'Start', width: 180, valueGetter: (value, row) => {return changeFormat(row.schedule.start)[1]}, sortable: false},
        { field: 'end', headerName: 'End', width: 180, valueGetter: (value, row) => {return changeFormat(row.schedule.end)[1]}, sortable: false},
        { 
          field: 'actions',
          headerName: 'Actions',
          width: 300,
          sortable: false,
          renderCell: (row) => (
            <>
              <Link to={`/edit-reservation/${params.roomId}/${row.id}`} >
                <Button variant="contained" color="primary">Editar<UpdateIcon/></Button>
              </Link>
              <Button variant="contained" color="primary" onClick={() => handleDeleteSchedule(row.id)}>Eliminar<DeleteIcon/></Button>
            </>
          )
        }
      ]
      const handleDeleteSchedule = (id) => {
        deleteReservationRequest(id).then((response) => {
          if(response && response.status === 200){
            const newReservations = reservations.filter(reservation => reservation._id !== id)
            setReservations(newReservations)
          }
        })
      }
    
      return (
          <div style={{width: '90%'}}>
              <h2>My reservations</h2>
              <DataGrid
                rows={reservations}
                columns={columns}
                getRowId={(reservation) => reservation._id}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                autoHeight
                rowSelection={false}
                
              />
            <Link to={`/add-reservation/`}><button>Add reservation</button></Link>
          </div>
      )
}



export default MyReservations
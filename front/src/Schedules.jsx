import React, { useEffect, useState  } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {getScheduleByRoomIdRequest, deleteScheduleRequest} from './api/schedule'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { changeFormat } from './util'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateIcon from '@mui/icons-material/Update'


const Schedules = () => {

  const [schedules, setSchedules] = useState([])
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(params)
    getScheduleByRoomIdRequest(params.roomId).then(response => setSchedules(response.schedules))
  }, [])


  const columns = [
    { field: 'day', headerName: 'Day', width: 250, type: 'String', renderCell: (row) => changeFormat(`${row.row.start}`)[0], sortable: false},
    { field: 'start', headerName: 'Start', width: 250, renderCell: (row) => changeFormat(row.value)[1], sortable: false},
    { field: 'end', headerName: 'End', width: 250, renderCell: (row) => changeFormat(row.value)[1], sortable: false},
    { 
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      sortable: false,
      renderCell: (row) => (
        <>
          <Link to={`/edit-schedule/${params.roomId}/${row.id}`} >
            <Button variant="contained" color="primary">Editar<UpdateIcon/></Button>
          </Link>
          <Button variant="contained" color="primary" onClick={() => handleDeleteSchedule(row)}>Eliminar<DeleteIcon/></Button>
        </>
      )
    }
  ]

  const handleDeleteSchedule = (id) => {
    deleteScheduleRequest(id).then((response) => {
      if(response && response.status === 200){
        const newSchedules = schedules.filter(schedule => schedule._id !== id)
        setSchedules(newSchedules)
      }
    })
  }

  return (
      <div style={{width: '90%'}}>

          <button onClick={()=>navigate(-1)}><ArrowBackIcon /></button>
          <h2>List of schedules</h2>
          <DataGrid
            rows={schedules}
            columns={columns}
            getRowId={(schedule) => schedule._id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            autoHeight
            rowSelection={false}
          />
        <Link to={`/add-schedule/${params.roomId}`}><button>Add Schedule</button></Link>
      </div>
  )
}

export default Schedules

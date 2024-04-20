import React, { useEffect, useState  } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {getScheduleByRoomIdRequest, deleteScheduleRequest} from './api/schedule'
import { DataGrid } from '@mui/x-data-grid'
import { changeFormat, schedulesAvailable } from './util'

import { createReservationRequest } from './api/reservation'

const FormReservation = () => {
    const [schedules, setSchedules] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        schedulesAvailable('66009730078fcfc9d77de48a', params.roomId).then(response => setSchedules(response))
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
              <button onClick={() => handleAddReservation(row)}>Reservar</button>
            </>
          )
        }
      ]
      const handleAddReservation = async(row) => {
        let data = {
          user: '66009730078fcfc9d77de48a',
          schedule: row.id
        }
        console.log(row.id)
        await createReservationRequest(data)
        navigate('/my-reservations')
      }
    
      return (
          <div style={{width: '90%'}}>
    
              <button onClick={()=>navigate(-1)}></button>
              <h2>Schedules available</h2>
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
          </div>
      )
    
}

export default FormReservation
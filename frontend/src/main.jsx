import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from '@/routes/App'

import { AuthProvider } from '@/context/AuthContext'
import { RoomProvider } from '@/context/RoomContext'
import { ScheduleProvider } from '@/context/ScheduleContext'
import { ReservationProvider } from '@/context/ReservationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RoomProvider>
      <ScheduleProvider>
        <ReservationProvider>
          <App />
        </ReservationProvider>
      </ScheduleProvider>
    </RoomProvider>
  </AuthProvider>
)

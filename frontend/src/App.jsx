import { useState } from 'react'

import Routing from "./router/Routing.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


function App() {
  return (
      <div className="container col-md-10 mt-3 border">
        <Routing />
      </div>
  )
}

export default App

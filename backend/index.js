//import dependencies
require('dotenv').config()
const express = require('express')
const connectionDB = require('./config/database')
const middlewareConfig = require('./config/middleware')
const routesConfig = require('./config/routes')

//create node server
const app = express()

//connect to db
connectionDB()

//load middlewares
middlewareConfig(app)

//load routes
routesConfig(app)


const port = process.env.PORT || 3000
//server ready to listen http request
app.listen(port, () => {
    console.log(`Node server running in port: ${port}`)
})
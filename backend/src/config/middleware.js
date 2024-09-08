const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

module.exports = (app) => {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser())
}
const jwt = require('jsonwebtoken')
require('dotenv').config()

const validateToken = (req, res, next) => {

    const JWT_SECRET = process.env.JWT_SECRET

    const token = req.cookies.token
    if(!token) return res.status(401).json({
        status: 401,
        message: 'No autorizado por falta de token'
    })

    jwt.verify(token, JWT_SECRET, (error, user) => {
        if(error) return res.status(401).json({
            status: 401,
            message: 'No autorizado por token inválido'
        })
        req.user = user
    })

    next()
}

module.exports = validateToken
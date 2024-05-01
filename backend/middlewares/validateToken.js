const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {

    const token = req.cookies.token
    if(!token) return res.status(401).json({
        status: 401,
        message: 'Unauthorized due to lack of token'
    })

    jwt.verify(token, 'secret123', (error, user) => {
        if(error) return res.status(401).json({
            status: 401,
            message: 'Unauthorized due to invalid token'
        })
        req.user = user
    })

    next()
}

module.exports = validateToken
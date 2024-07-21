const User = require('./userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userService = require('./userService')

const login = async (req, res) => {
    try{

        const {email, password} = req.body
        const [userFound, token] = await userService.login(email, password)
        res.cookie('token', token)

        return res.status(200).json({
            status:200,
            id: userFound._id,
            email: userFound.email,
            role: userFound.role
        })
    }catch (error){
        return res.status(500).json({
            status:500,
            error: error.message
        })
    }
}

const register = async (req, res) => {
    
    try{
        const {email, password} = req.body
        const [userSaved, token] = await userService.register(email, password)

        res.cookie('token', token)
        res.status(201).json({
            status: 201,
            id: userSaved._id,
            email: userSaved.email,
            role: userSaved.role,
            status: userSaved.status,
            message: 'User created successfully'
        })

    }catch (error){
        res.status(500).json({
            error: error.message
        })
    }
    
}

const logout = async (req, res) => {
    res.cookie('token', '', {expires: new Date(0)})
    res.status(200).json({
        status: 200,
        message: 'User logged out successfully'
    })
}

const verify = (req, res) => {
    const {token} = req.cookies
    if(!token) return res.status(401).json({
        status: 401,
        error: 'Unauthorized'
    })

    const decoded = userService.verify(token)
    const userFound = User.findById(decoded.id)
    res.status(200).json({
        status: 200,
        id: decoded.id,
        role: userFound.role
    })
}

const getUsers = async (req, res) => {
    try{
        const users = await userService.getUsers()
        res.status(200).json({
            status: 200,
            users
        })
    }catch (error){
        res.status(500).json({
            error: error.message
        })
    }
}

const getUser = async (req, res) => {
    try{
        const user = await userService.getUser(req.params.id)
        res.status(200).json({
            status: 200,
            user
        })
    }catch (error){
        res.status(500).json({
            error: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try{
        const updatedUser = await userService.updateUser(req.params.id, req.body)
        res.status(200).json({
            status: 200,
            updatedUser
        })
    }
    catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    login,
    register,
    logout,
    verify,
    getUsers,
    getUser,
    updateUser
}
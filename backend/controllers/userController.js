const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    try{

        const {email, password} = req.body
        const userFound = await User.findOne({email})

        if(!userFound) return res.status(400).json({
            status: 400,
            error: 'Invalid credentials. Please verify username and password and try again.'
        })

        const matched = await bcrypt.compare(password, userFound.password)
        if(!matched) return res.status(400).json({
            status: 400,
            error: 'Invalid credentials. Please verify username and password and try again.'
        })

        if(userFound.status === 'pending') return res.status(400).json({
            status: 400,
            error: 'User not verified. Please contact the administrator to verify your account.',
            userFound
        })
        
        const token = jwt.sign({id: userFound._id}, 'secret123', {expiresIn: '1h'}) 
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
        let hash_password = await bcrypt.hash(password,10)
        
        //check if email has '@alumnos' to determine role
        if(email.includes('@alumnos.upm.es')){
            role = 'student'
        }
        else{
            role = 'professor'
        }

        let existingUser = await User.findOne({email: email})
        if(existingUser) return res.status(400).json({
            status:400,
            error:"user existing"
        })

        const newUser = new User({
            email,
            password: hash_password,
            role,
            status: 'pending'
        })
    
        const userSaved = await newUser.save()
        const token = jwt.sign({id: userSaved._id}, 'secret123', {expiresIn: '1h'})  

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

    jwt.verify(token, 'secret123', async (error, user) => {
        if(error) return res.status(401).json({
            status: 401,
            error: 'Unauthorized'
        })
        const userFound = await User.findById(user.id)
        res.status(200).json({
            status: 200,
            id: user.id,
            role: userFound.role
        })
    })
}

const getUsers = async (req, res) => {
    try{
        const users = await User.find().select('email status role').sort({role: 1})
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
        const user = await User.findById(req.params.id)
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
        const updatedUser = User.findByIdAndUpdate(req.params, req.body, {new: true})
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
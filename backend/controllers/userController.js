const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    try{

        const {email, password} = req.body
        const userFound = await User.findOne({email})

        if(!userFound) return res.status(400).json({
            status: 400,
            message: 'Invalid credentials. Please verify username and password and try again.'
        })

        const matched = await bcrypt.compare(password, userFound.password)
        if(!matched) return res.status(400).json({
            status: 400,
            message: 'Invalid credentials. Please verify username and password and try again.'
        })
        
        const token = jwt.sign({id: userFound._id}, 'secret123', {expiresIn: '1h'}) 
        res.cookie('token', token, {httpOnly: true})

        return res.status(200).json({
            status:200,
            id: userFound._id,
            email: userFound.email,
            role: userFound.role
        })
    }catch (error){
        return res.status(500).json({
            status:500,
            message: error.message
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
        if(!existingUser) return res.status(400).json({
            status:400,
            message:"user existing"
        })

        const newUser = new User({
            email,
            password: hash_password,
            role
        })
    
        const userSaved = await newUser.save()
        const token = jwt.sign({id: userSaved._id}, 'secret123', {expiresIn: '1h'})  

        res.cookie('token', token, {httpOnly: true})
        res.status(201).json({
            status: 201,
            id: userSaved._id,
            email: userSaved.email,
            role: userSaved.role,
            message: 'User created successfully'
        })

    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
    
}

const logout = async (req, res) => {
    res.cookie('token', '', {httpOnly: true, expires: new Date(0)})
    res.status(200).json({
        status: 200,
        message: 'User logged out successfully'
    })
}

module.exports = {
    login,
    register,
    logout
}
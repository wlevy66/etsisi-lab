const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    try{

        const {email, password} = req.body
        const userFound = await User.findOne({email})

        if(!userFound) return res.status(400).json({
            status: 400,
            message: 'Invalid credentials. Please verify username and password and try again.'
        })

        let matched = await bcrypt.compare(password, userFound.password)
        if(!matched) return res.status(400).json({
            status: 400,
            message: 'Invalid credentials. Please verify username and password and try again.'
        })
        

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
        const {email, password, role} = req.body
        let hash_password = await bcrypt.hash(password,10)
    
        const newUser = new User({
            email,
            password: hash_password,
            role
        })
    
        const userSaved = await newUser.save()
    
        res.status(200).json({
            id: userSaved._id,
            email: userSaved.email,
            role: userSaved.role
        })
    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
    
}

module.exports = {
    login,
    register
}
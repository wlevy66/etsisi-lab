const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    try{

        const {email, password} = req.body
        const userFound = await User.findOne({email})

        if(!userFound) return res.json({
            message: 'User not found'
        })
        let matched = bcrypt.compare(password, userFound.password)
        if(!matched) return res.json({
            message: 'password does not match'
        })

        res.status(200).json({
            id: userFound._id,
            email: userFound.email
        })
    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
}

const register = async (req, res) => {
    
    try{
        const {email, password} = req.body
        let hash_password = await bcrypt.hash(password,10)
    
        const newUser = new User({
            email,
            password: hash_password
        })
    
        const userSaved = await newUser.save()
    
        res.status(200).json({
            id: userSaved._id,
            email: userSaved.email
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
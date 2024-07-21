const User = require('./userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (email, password) => {
    try{
        const userFound = await User.findOne({email})
        if(!userFound) throw new Error('Invalid credentials. Please verify username and password and try again.')
        
        const matched = await bcrypt.compare(password, userFound.password)
        if(!matched) throw new Error('Invalid credentials. Please verify username and password and try again.')
        
        if(userFound.status === 'pending') throw new Error('User not verified. Please contact the administrator to verify your account.')
        
        const token = jwt.sign(
            {id: userFound._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        return [userFound, token]
    } catch(error){
        throw new Error(error.message)
    }
}

const register = async (email, password) => {
    try{
        let hash_password = await bcrypt.hash(password,10)
        
        //check if email has '@alumnos' to determine role
        if(email.includes('@alumnos.upm.es')){
            role = 'student'
        }
        else{
            role = 'professor'
        }

        let existingUser = await User.findOne({email: email})
        if(existingUser) throw new Error('User already exists. Please try again with a different email.')

        const newUser = new User({
            email,
            password: hash_password,
            role,
            status: 'pending'
        })
    
        const userSaved = await newUser.save()
        const token = jwt.sign({id: userSaved._id}, process.env.JWT_SECRET, {expiresIn: '1h'})  

        return [userSaved, token]
    } catch(error){
        throw new Error(error.message)
    }
}

const verify = (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch(error){
        throw new Error(error.message)
    }
}

const getUsers = async () => {
    try{
        return await User.find().select('email status role').sort({role: 1})
    } catch(error){
        throw new Error(error.message)
    }
}

const getUser = async (id) => {
    try{
        return await User.findById(id)
    }
    catch(error){
        throw new Error(error.message)
    }
}

const updateUser = async (id, body) => {
    try{
        return await User.findByIdAndUpdate(id, body, {new: true})
    }
    catch(error){
        throw new Error(error.message)
    }
}

module.exports = {
    login,
    register,
    verify,
    getUsers,
    getUser,
    updateUser
}

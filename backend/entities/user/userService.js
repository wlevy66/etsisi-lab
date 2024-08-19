const User = require('./userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const status = require('../../constans/status')
const roles = require('../../constans/roles')

const login = async (user) => {
    try{
        const {email, password} = user
        
        const userFound = await User.findOne({email})
        if(!userFound) throw new Error('Invalid credentials. Please verify username and password and try again.')
        
        const matched = await bcrypt.compare(password, userFound.password)
        if(!matched) throw new Error('Invalid credentials. Please verify username and password and try again.')
        
        if(userFound.status !== status.ACTIVE) throw new Error('User not verified. Please contact the administrator to verify your account.')
        
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

const register = async (user) => {
    try{
        const {name, lastname, phone, email, password, confirmPassword} = user

        if(password !== confirmPassword) throw new Error('Passwords do not match. Please try again.')
        if(password.length < 6) throw new Error('Password must be at least 6 characters long. Please try again.')
        
        const existingUser = await User.findOne({email: email})
        if(existingUser) throw new Error('User already exists. Please try again with a different email.')

        let role
        if(email.includes('@alumnos.upm.es')){
            role = roles.STUDENT_ROLE
        }
        else{
            role = roles.PROFESSOR_ROLE
        }
        
        const hash_password = await bcrypt.hash(password,10)
        const newUser = new User({
            name,
            lastname,
            phone,
            email,
            password: hash_password,
            role,
            status: status.PENDING
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
        return null
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
        return await User.findById(id).select('name lastname phone email status role')
    }
    catch(error){
        throw new Error(error.message)
    }
}

const updateProfile = async (id, user) => {
    try{
        const {name, lastname, phone} = user

        let userFound = await User.findById(id)
        if(!userFound) throw new Error('User not found. Please try again.')
        
        userFound.name = name
        userFound.lastname = lastname
        userFound.phone = phone
        await userFound.save()
    }
    catch(error){
        throw new Error(error.message)
    }
}

const updatePassword = async (id, user) => {
    try{
        const {currentPassword, newPassword, confirmPassword} = user

        if(currentPassword === newPassword) throw new Error('New password must be different from current password. Please try again.')

        if(newPassword !== confirmPassword) throw new Error('Passwords do not match. Please try again.')

        let userFound = await User.findById(id)
        if(!userFound) throw new Error('User not found. Please try again.')

        let matched = await bcrypt.compare(currentPassword, userFound.password)
        if(!matched) throw new Error('Current password is incorrect. Please try again.')

        let new_hash_password = await bcrypt.hash(newPassword,10)
        userFound.password = new_hash_password
        await userFound.save()
    }
    catch(error){
        throw new Error(error.message)
    }
}

const updateByAdmin = async (id, user) => {
    try{
        const {email, role, status} = user
        
        let userFound = await User.findById(id)
        if(!userFound) throw new Error('User not found. Please try again.')
        
        userFound.email = email
        userFound.role = role
        userFound.status = status
        await userFound.save()
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
    updateProfile,
    updatePassword,
    updateByAdmin
}

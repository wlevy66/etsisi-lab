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
        if(!userFound) throw new Error('Credenciales inválidas. Por favor, verifique el email y la contraseña e intente de nuevo.')
        
        const matched = await bcrypt.compare(password, userFound.password)
        if(!matched) throw new Error('Credenciales inválidas. Por favor, verifique el email y la contraseña e intente de nuevo.')
        
        if(userFound.status !== status.ACTIVE) throw new Error('Usuario no activo. Por favor, contacte con el administrador.')
        
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
        const {name, lastname, phone, email, password} = user
        
        const existingUser = await User.findOne({email: email})
        if(existingUser) throw new Error('El email ya está registrado. Por favor, inicie sesión o utilice otro email.')

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
        if(!userFound) throw new Error('Usuario no encontrado. Por favor, intente de nuevo.')
        
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

        if(currentPassword === newPassword) throw new Error('La nueva contraseña no puede ser igual a la actual. Por favor, intente de nuevo.')

        let userFound = await User.findById(id)
        if(!userFound) throw new Error('Usuario no encontrado. Por favor, intente de nuevo.')

        let matched = await bcrypt.compare(currentPassword, userFound.password)
        if(!matched) throw new Error('La contraseña actual no es correcta. Por favor, intente de nuevo.')

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
        if(!userFound) throw new Error('Usuario no encontrado. Por favor, intente de nuevo.')
        
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
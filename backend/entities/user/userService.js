const User = require('./userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (email, password) => {
    try{
        const userFound = await User.findOne({email})
        if(!userFound) throw new Error('Invalid credentials. Please verify username and password and try again.')
        
        const matched = await bcrypt.compare(password, userFound.password)
        if(!matched) throw new Error('Invalid credentials. Please verify username and password and try again.')
        
        if(userFound.status === 'pending') throw new Error('User not verified. Please contact the administrator to verify your account.')
        
        const token = jwt.sign(
            {id: userFound._id},
            'secret123',
            {expiresIn: '1h'}
        )
        return token
    } catch(error){
        throw new Error(error.message)
    }
}

module.exports = {
    login
}

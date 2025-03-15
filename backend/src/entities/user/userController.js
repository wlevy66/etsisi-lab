const User = require('./userModel')
const userService = require('./userService')

const login = async (req, res) => {
    try {
        const [userFound, token] = await userService.login(req.body)
        res.cookie('token', token)

        res.status(200).json({
            status: 200,
            id: userFound._id,
            name: userFound.name,
            lastname: userFound.lastname,
            phone: userFound.phone,
            email: userFound.email,
            role: userFound.role
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        })
    }
}

const register = async (req, res) => {
    try {
        const [userSaved, token] = await userService.register(req.body)

        res.cookie('token', token)
        res.status(201).json({
            status: 201,
            id: userSaved._id,
            message: 'Usuario registrado correctamente!'
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

const logout = async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) })
    res.status(200).json({
        status: 200,
        message: 'Usuario deslogueado correctamente!'
    })
}

const verify = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({
        status: 401,
        error: 'Sin autorización para acceder a este recurso.'
    })

    const decoded = userService.verify(token)
    if (!decoded) return res.status(401).json({
        status: 401,
        error: 'Sin autorización para acceder a este recurso.'
    })

    const userFound = await User.findById(decoded.id)
    if (!userFound) {
        return res.status(404).json({
            status: 404,
            error: 'Usuario no encontrado'
        })
    }

    res.status(200).json({
        status: 200,
        id: userFound._id,
        name: userFound.name,
        lastname: userFound.lastname,
        phone: userFound.phone,
        email: userFound.email,
        role: userFound.role
    })
}

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers()
        res.status(200).json({
            status: 200,
            users
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id)
        res.status(200).json({
            status: 200,
            user
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        await userService.updateProfile(req.params.id, req.body)
        res.status(200).json({
            status: 200,
            message: 'Perfil actualizado correctamente!',
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updatePassword = async (req, res) => {
    try {
        await userService.updatePassword(req.params.id, req.body)
        res.status(200).json({
            status: 200,
            message: 'Contraseña actualizada correctamente!'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateByAdmin = async (req, res) => {
    try {
        await userService.updateByAdmin(req.params.id, req.body)
        res.status(200).json({
            status: 200,
            message: 'Usuario actualizado por el administrador correctamente!'
        })
    } catch (error) {
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
    updateProfile,
    updatePassword,
    updateByAdmin
}
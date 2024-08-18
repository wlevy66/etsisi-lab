export const transformRole = (role) => {
    switch(role){
        case 'admin':
            return 'Administrador'
        case 'professor':
            return 'Profesor'
        case 'student':
            return 'Estudiante'
    }
}

export const transformStatus = (status) => {
    switch(status){
        case 'active':
            return 'Activo'
        case 'inactive':
            return 'Inactivo'
        case 'pending':
            return 'Pendiente'
    }
}
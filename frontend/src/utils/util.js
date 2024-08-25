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

export const minDateValue = () => {
    const today = new Date()
    const minDate = new Date(today)
    minDate.setDate(minDate.getDate() + 1)
    const day = String(minDate.getDate()).padStart(2, '0')
    const month = String(minDate.getMonth() + 1).padStart(2, '0')
    const year = minDate.getFullYear();
    return `${year}-${month}-${day}`
}
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const RegisterPage = () => {

    const { register, handleSubmit } = useForm()
    const { registerAccount, error, setError, success, setSuccess } = useAuth()

    useEffect(() => {
        setSuccess(null)
        setError(null)
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        setSuccess(null)
        setError(null)
        registerAccount(data)
    })

    return (
        <form className="sm:w-full md:w-2/5 page" onSubmit={onSubmit}>
            <h1>SERVICIO DE REGISTRO</h1>
            <hr className='mb-4' />
            <div className="mb-4">
                <label htmlFor="name">
                    Nombre
                </label>
                <input id="name" type="text" placeholder="Nombre"
                    {...register('name', { required: true })} />
            </div>

            <div className="mb-4">
                <label htmlFor="lastname">
                    Apellidos
                </label>
                <input id="lastname" type="text" placeholder="Apellidos"
                    {...register('lastname', { required: true })} />
            </div>

            <div className="mb-4">
                <label htmlFor="phone">
                    Teléfono
                </label>
                <input
                    {...register('phone', { required: true })}
                    id="phone" type="text" placeholder="Teléfono" />
            </div>

            <div className="mb-4">
                <label htmlFor="email">
                    Correo electrónico
                </label>
                <input id="email" type="email" placeholder="Correo electrónico"
                    {...register('email', { required: true })} />
            </div>

            <div className="mb-4">
                <label htmlFor="password">
                    Contraseña
                </label>
                <input id="password" type="password" placeholder="Contraseña"
                    {...register('password', { required: true })} />
            </div>

            <div className="mb-4">
                <label htmlFor="confirmPassword">
                    Confirmar contraseña
                </label>
                <input id="confirmPassword" type="password" placeholder="Confirmar contraseña"
                    {...register('confirmPassword', { required: true })} />
            </div>
            <div className='mb-4'>{error && <span className='error'>{error}</span>}</div>
            <div className='mb-4'>{success && <span className='success'>{success}</span>}</div>
            <div className="flex items-center justify-between">
                <button className="submit" type="submit">
                    REGISTRAR
                </button>
            </div>
            <p className='mt-3 flex gap-x-5'>
                ¿Ya tienes cuenta? <Link to={'/login'} className='link'>Iniciar sesión</Link>
            </p>
        </form>
    )
}

export default RegisterPage
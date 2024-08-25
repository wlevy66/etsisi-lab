import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const LoginPage = () => {

    const { register, handleSubmit } = useForm()
    const { login, error, isAuthenticated, setError } = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (values) => {
        login(values)
    })

    useEffect(() => {
        setError(null)
        if (isAuthenticated) navigate('/dashboard')
    }, [isAuthenticated])

    return (
        <form className="sm:w-full md:w-1/3 page" onSubmit={onSubmit}>
            <h1>SERVICIO DE AUTENTICACIÓN</h1>
            <hr className='mb-4' />
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
            <div className='mb-4'>{error && <span className='error'>{error}</span>}</div>
            <div className="flex justify-between">
                <button className="submit" type="submit">
                    INICIAR SESIÓN
                </button>
            </div>
            <p className='mt-3 flex gap-x-5'>
                ¿No estás dado de alta? <Link to={'/register'} className='text-sky-500 font-semibold underline'>Registrarse</Link>
            </p>
        </form>
    )
}

export default LoginPage
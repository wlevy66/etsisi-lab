import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const LoginPage = () => {

    const { register, handleSubmit } = useForm()
    const {signIn, error, isAuthenticated, setError} = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit( async(values)=>{
        signIn(values)
    })

    useEffect(() => {
        setError(null)
        if(isAuthenticated) navigate('/dashboard')
    }, [isAuthenticated])

    return (
        <form className="sm:w-full md:w-1/2 mx-auto border rounded p-8 mt-6" onSubmit={onSubmit}>
            <h1 className='font-bold italic text-3xl mb-3 text-left'>SERVICIO DE AUTENTICACIÓN</h1>
            <hr className='mb-4'/>
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="email">
                        Correo electrónico
                    </label>
                    <input
                        {...register('email', { required: true })}
                        className="border rounded w-full p-2" id="email" type="email" placeholder="Correo electrónico" />
                </div>
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        {...register('password', { required: true })}
                        className="border rounded w-full p-2" id="password" type="password" placeholder="Contraseña" />
                    
                </div>
                <div className='mb-4'>{error && <span className='text-red-500 text-xs italic'>{error}</span>}</div>
                <div className="flex justify-between">
                    <button className="login" type="submit">
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
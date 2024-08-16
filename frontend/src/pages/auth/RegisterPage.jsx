import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const RegisterPage = () => {

    const { register, handleSubmit } = useForm()

    const { signUp, error, setError, success, setSuccess } = useAuth()

    useEffect(() => {
        setSuccess(false)
        setError(null)
    }, [])

    const onSubmit = handleSubmit(async (values) => {
        setSuccess(false)
        setError(null)
        signUp(values)
    })

    return (
        <form className="sm:w-full md:w-1/3 mx-auto border rounded p-4 mt-6" onSubmit={onSubmit}>
            <h1 className='font-bold italic text-3xl my-3 text-left'>SERVICIO DE REGISTRO</h1>
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
                <div className='mb-4'>{error && <span className='error'>{error}</span>}</div>
                <div className='mb-4'>{success && <span className='text-green-500 text-xs italic'>Usuario creado correctamente, puedes iniciar sesión.</span>}</div>
                <div className="flex items-center justify-between">
                    <button className="register" type="submit">
                        REGISTRAR
                    </button>
                </div>
            <p className='mt-3 flex gap-x-5'>
                ¿Ya tienes cuenta? <Link to={'/register'} className='text-sky-500 font-semibold underline'>Iniciar sesión</Link>
            </p>
        </form>
    )
}

export default RegisterPage
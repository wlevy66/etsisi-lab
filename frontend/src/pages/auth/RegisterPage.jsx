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
        <form className="sm:w-full md:w-1/3 mx-auto border rounded p-4 mt-6" onSubmit={onSubmit}>
            <h1 className='font-bold italic text-3xl my-3 text-left'>SERVICIO DE REGISTRO</h1>
            <hr className='mb-4'/>
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        {...register('name', { required: true })}
                        className="border rounded w-full p-2" id="name" type="text" placeholder="Nombre" />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="lastname">
                        Apellidos
                    </label>
                    <input
                        {...register('lastname', { required: true })}
                        className="border rounded w-full p-2" id="lastname" type="text" placeholder="Apellidos" />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="phone">
                        Teléfono
                    </label>
                    <input
                        {...register('phone', { required: true })}
                        className="border rounded w-full p-2" id="phone" type="text" placeholder="Teléfono" />
                </div>

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
                <div className="mb-4">
                    <label className="block text-md font-bold mb-2" htmlFor="confirmPassword">
                        Confirmar contraseña
                    </label>
                    <input
                        {...register('confirmPassword', { required: true })}
                        className="border rounded w-full p-2" id="confirmPassword" type="password" placeholder="Confirmar contraseña" />
                    
                </div>
                <div className='mb-4'>{error && <span className='error'>{error}</span>}</div>
                <div className='mb-4'>{success && <span className='text-green-500 text-xs italic'>{success}</span>}</div>
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
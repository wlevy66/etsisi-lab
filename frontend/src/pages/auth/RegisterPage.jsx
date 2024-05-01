import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'

const RegisterPage = () => {

    const { register, handleSubmit } = useForm()

    const { signUp, error } = useAuth()

    const onSubmit = handleSubmit(async (values) => {
        signUp(values)
    })

    return (
        <div className="w-full max-w-xs mx-auto mt-5">
            <h1 className='font-bold text-3xl mb-1 text-center'>Registro</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Correo electrónico
                    </label>
                    <input
                        {...register('email', { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="email" type="email" placeholder="Correo electrónico" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        {...register('password', { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="password" type="password" placeholder="Contraseña" />

                </div>
                <div className='mb-4'>{error && <span className='text-red-500 text-xs italic'>{error}</span>}</div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                        Registrarme
                    </button>
                </div>
            </form>
            <p className='flex gap-x-2 justify-between'>
                ¿Ya tienes cuenta? <Link to={'/login'} className='text-sky-500'>Iniciar sesión</Link>
            </p>
        </div>
    )
}

export default RegisterPage
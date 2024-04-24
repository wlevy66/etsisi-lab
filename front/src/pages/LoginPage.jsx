import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const LoginPage = () => {

    const { register, 
        handleSubmit,
        formState:{
        errors
    } } = useForm()

    const {signIn, error, isAuthenticated} = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit( async(values)=>{
        signIn(values)
    })

    useEffect(() => {
        if(isAuthenticated) navigate('/dashboard')
    }, [isAuthenticated])

    return (
        <>
  
        
        <div className="w-full max-w-xs mx-auto mt-5">
        <h1 className='font-bold text-3xl mb-1'>Login</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo electrónico
                </label>
                <input 
                 {...register('email', {required: true})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="email" type="email" placeholder="Correo electrónico" />
                <div>{error && <span className='text-red-500 text-xs italic'>{error}</span>}</div>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
                </label>
                <input 
                 {...register('password', {required: true})}
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 " id="password" type="password" placeholder="Contraseña" />
                <div>{error && <span className='text-red-500 text-xs italic'>{error}</span>}</div>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Sign In
                </button>
            </div>
            </form>
            <p className='flex gap-x-2 justify-between'>
                Don't have an account? <Link to={'/register'} className='text-sky-500'>Register</Link>
            </p>
        </div>
        </>
    )
}

export default LoginPage
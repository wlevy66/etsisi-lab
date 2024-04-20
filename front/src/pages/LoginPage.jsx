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
        <div className='flex items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <h1 className='font-bold'>Login</h1>
                <form onSubmit={onSubmit}>
                
                <input type="email" placeholder="Enter email" 
                {...register('email', {required: true})}
                className='w-full bg-zinc-700 px-4 py-2 my-2'/>
                <div>{error && <span>{error}</span>}</div>
                {errors.email && <span>This field is required</span>}
                
                <input type="password" placeholder="Password"
                    {...register('password', {required: true})}
                    className='w-full bg-zinc-700 px-4 py-2 my-2'/>
                <div>{error && <span>{error}</span>}</div>
                {errors.password && <span>This field is required</span>}
                <br />
                <button type="submit">Submit</button>
            </form>
            <p className='flex gap-x-2 justify-between'>
                Don't have an account? <Link to={'/register'} className='text-sky-500'>Register</Link>
            </p>
            </div>
        </div>
    )
}

export default LoginPage
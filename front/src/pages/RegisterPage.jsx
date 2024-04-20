import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const RegisterPage = () => {

    const { register, 
        handleSubmit,
        formState:{
        errors
    } } = useForm()

    const {signUp, error} = useAuth()

    const onSubmit = handleSubmit( async(values)=>{
        signUp(values)
    })

    return (
        <div className='max-w-md p-10 rounded-md mx-2'>
            <form onSubmit={onSubmit}>
               
                <input type="email" placeholder="Enter email" 
                {...register('email', {required: true})}
                className='w-full bg-zinc-700 px-4 py-2 my-2'/>
                <div>
                    {error && <span>{error}</span>}
                </div>
                {errors.email && <span>This field is required</span>}
                
                <input type="password" placeholder="Password"
                  {...register('password', {required: true})}
                  className='w-full bg-zinc-700 px-4 py-2 my-2'/>
                {errors.password && <span>This field is required</span>}
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p className='flex gap-x-2 justify-between'>
                Already have an account? <Link to={'/login'} className='text-sky-500'>Sign in</Link>
            </p>
        </div>
    )
}

export default RegisterPage
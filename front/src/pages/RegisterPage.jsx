import { useForm } from 'react-hook-form'
import {registerRequest} from '../api/user'


const RegisterPage = () => {

    const { register, handleSubmit } = useForm()

    return (
        <div className='max-w-md p-10 rounded-md mx-2'>
            <form onSubmit={handleSubmit( async(values)=>{
                const response = await registerRequest(values)
                console.log(response)
            })}>
                <input type="email" placeholder="Enter email" 
                {...register('email', {required: true})}
                className='w-full bg-zing-700 px-4 py-2 my-2'/>

                <input type="password" placeholder="Password"
                  {...register('password', {required: true})}
                  className='w-full bg-zing-700 px-4 py-2 my-2'/>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default RegisterPage
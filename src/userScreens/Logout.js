import React from 'react'
import { useNavigate } from 'react-router-dom'
import { notifyError } from '../Helpers/toaster';

const Logout = () => {
    const navigate = useNavigate();

    const signoutHandler = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
        notifyError('Logout Successfully')
    }
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className='text-white text-4xl font-bold opacity-25'>Logout</h1>
        <button onClick={signoutHandler} className='bg-red-900  hover:bg-red-600 rounded-md mt-4 p-2 px-6'>Signout</button>
    </div>
  )
}

export default Logout
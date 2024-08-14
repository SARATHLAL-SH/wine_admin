import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginHandler } from '../Redux/Slices/authReducer'
import { notifyError, notifySuccess } from '../Helpers/toaster'


function LoginScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error,isAuthenticated} = useSelector((state)=>state.auth)
  const [userData, setUserData] = useState({
    adminName: '',
    adminPassword: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    
  try {
   const response = await dispatch(loginHandler(userData))
   console.log("response==>",response)
  if(response.payload.token){
  console.log("response==>",response)
   navigate("/Home")
  }
  notifySuccess("Login Successfully")
  }
  catch (error) {
  console.log(error)
  notifyError("Invalid Credentials")
}    
  }

  return (
    <div className='bg-radiant-blue h-screen w-screen flex items-center justify-center flex-col' >
      <div>
        <h1 className='text-blue-400 text-5xl font-bold opacity-25'>Admin Login</h1>
      </div>
      <div className='flex flex-col '>
        <input type='text' value={userData.adminName} name="adminName" onChange={onChangeHandler} placeholder='Username' className=' border-b mt-5  p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-white font-bold' />
        <input type='password' value={userData.adminPassword} name='adminPassword' onChange={onChangeHandler} placeholder='Password' className='border-b mt-5   p-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-b-red-600 text-white font-bold'/>
      </div>
      <button onClick={handleLogin} className='bg-blue-600 mt-5 p-1 text-white font-bold w-28'>Login</button>
      {error && <p className='text-red-500'>{error}</p>}
    </div>                              
  )
}

export default LoginScreen

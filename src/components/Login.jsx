import React from 'react'
import logo from '../assets/spootify_logo.svg';

const Login = () => {

  const handleClick = () =>{
  }
  return (
    <div className='flex flex-col items-center justify-center w-full h-[100vh]'>
      <img className=' max-w-lg mb-10' src={logo} alt="" />
      <button onClick={handleClick} className='bg-white rounded-full py-2 px-10 text-black font-bold'>Login</button>
    </div>
  )
}

export default Login
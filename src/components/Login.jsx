import React from 'react'
import logo from '../assets/spootify_logo.svg';
 import { loginUrl } from '../utils/spotify';
//  import { getTokenFromUrl } from '../utils/spotify';

const Login = () => {

  const handleClick = () =>{
    window.location.href= loginUrl;
    // console.log(token);
  }
  return (
    <div className='bg-black flex flex-col items-center justify-center w-screen h-screen'>
      <img className=' max-w-lg mb-10' src={logo} alt="" />
      <button onClick={handleClick} className='min-w-[200px] bg-white rounded-full py-3 px-10 text-black font-bold'>Login</button>
    </div>
  )
}

export default Login;
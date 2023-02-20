import React from 'react'
import {RiSearchLine,RiUserFill} from 'react-icons/ri'
import { useStateProvider } from '../utils/StateProvider'

const Navbar = () => {
  const [{userInfo}] = useStateProvider();
  return (
    <div className='text-white w-full p-4 flex items-center justify-between'>
      <div className='bg-white flex items-center rounded-full p-2 pr-4 mr-4'>
        <RiSearchLine className='text-black text-2xl mr-2'/>
        <input className='p-0 border-0' type="text" placeholder='想聽什麼？'/>
      </div>
      <div className='bg-black p-2 pr-4 flex gap-3 rounded-full'>
        <div className='bg-gray-500 flex items-end overflow-hidden justify-center w-6 h-6 rounded-full text-lg'>
        <RiUserFill/>
          </div>
        {userInfo?.userName}
      </div>
    </div>
  )
}

export default Navbar
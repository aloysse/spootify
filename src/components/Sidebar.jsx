import React from 'react'
import {RiPlayList2Line,RiHome4Line,RiSearchLine} from 'react-icons/ri'
import logo from '../assets/spootify_logo.svg';
import PlayLists from './PlayLists'

const sidebarContents = [
  
]

const Sidebar = () => {
  return (
    <div className='bg-black text-white p-5 pb-0 flex flex-col'>
      <img className='w-full py-3 mb-3' src={logo} alt="" />
      <ul className='flex flex-col gap-3 mb-5 text-gray-400'>
        <li className='flex cursor-pointer gap-3 items-center'><RiHome4Line className='text-2xl'/><p className='text-base'>首頁</p></li>
        <li className='flex cursor-pointer gap-3 items-center'><RiSearchLine className='text-2xl'/><p className='text-base'>搜尋</p></li>
        <li className='flex cursor-pointer gap-3 items-center'><RiPlayList2Line className='text-2xl'/><p className='text-base'>你的音樂庫</p></li>
      </ul>
      <hr className='mb-5 border-gray-600'/>
      <PlayLists/>
    </div>
  )
}
 
export default Sidebar
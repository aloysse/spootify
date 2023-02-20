import React,{useEffect} from 'react'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Body from './Body'
import Navbar from './Navbar'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { spotifyAPI } from '../utils/spotify'
import { reducerCases } from '../utils/Constants'

const Player = () => {

  const [{token,userInfo},dispatch] = useStateProvider();

  useEffect(()=>{
    const getUserInfoData = async() =>{
      const response = await axios.get(`${spotifyAPI}me`,{
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
      }});
      const userInfo = {
        userId: response.data.id,
      userName: response.data.display_name};
      dispatch(
        {type: reducerCases.SET_USER_INFO,
        userInfo,}
      );
      console.log('已要求使用者資料')
    }
    getUserInfoData();
  },[dispatch,token])

  return (
    <div className='w-screen h-screen grid grid-rows-[85vh_15vh] overflow-hidden'>
      <div className='grid grid-cols-[200px_1fr] h-full w-full bg-gradient-to-t from-slate-500 to-blue-900'>
        <Sidebar / >
          <div className='flex flex-col'>
            <Navbar/>
            <div className='w-full h-full overflow-auto relative'>
              <Body/>
            </div>
          </div>
      </div>
      <div><Footer/></div>
    </div>
  )
}

export default Player
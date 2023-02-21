import React from 'react'
import axios from 'axios'
import {TbMicrophone2,TbList,TbVolume2,TbVolume,TbVolumeOff} from 'react-icons/tb'
import { spotifyAPI } from '../utils/spotify'
import { useStateProvider } from '../utils/StateProvider'

const Volume = () => {
  const [{token}] = useStateProvider()
  const setVolume = async(e)=>{
    await axios.put(`${spotifyAPI}me/player/volume`,{},{
      params: {
        volume_percent: parseInt(e.target.value)
      },
      headers:{
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
    }
    })
  }
  
  return (
    <div className='flex justify-end text-gray-400 gap-3 text-xl'>
      <button><TbMicrophone2/></button>
      <button><TbList/></button>
      <button><TbVolume2/></button>
      <div><input type="range" min={0} max={100} onMouseUp={setVolume}/></div>
    </div>
  )
}

export default Volume
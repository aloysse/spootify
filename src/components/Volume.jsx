import React,{useState,useRef} from 'react'
// import axios from 'axios'
import {TbMicrophone2,TbList,TbVolume2,TbVolume,TbVolumeOff} from 'react-icons/tb'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants'

const Volume = () => {
  const [{volume},dispatch] = useStateProvider()
  const [mute, setMute] = useState(false);
  const [volumeControl, setVolumeControl] = useState(100);
  const valueRef = useRef(null);

  const setVolume = (e)=>{
    // await axios.put(`${spotifyAPI}me/player/volume`,{},{
    //   params: {
    //     volume_percent: parseInt(e.target.value)
    //   },
    //   headers:{
    //     Authorization: 'Bearer ' + token,
    //     'Content-Type': 'application/json',
    // }
    // })
    setVolumeControl(e.target.value);
    dispatch({type:reducerCases.SET_VOLUME, volume:e.target.value/100})
  }

  const handleMute = () => {
    if(!mute){
      dispatch({type:reducerCases.SET_VOLUME, volume:0})
      valueRef.current.value = 0;
      setMute(true)
    } else {
      dispatch({type:reducerCases.SET_VOLUME, volume:volumeControl/100})
      valueRef.current.value = volumeControl;
      setMute(false)
    }
  }
  
  return (
    <div className='flex justify-end text-gray-400 gap-3 text-xl'>
      <button><TbMicrophone2/></button>
      <button><TbList/></button>
      <button onClick={()=>{handleMute()}}> {mute? <TbVolumeOff/> : <TbVolume2/> }</button>
      <div><input type="range" min={0} max={100} defaultValue={volumeControl} onMouseUp={setVolume} ref={valueRef}/></div>
    </div>
  )
}

export default Volume
import React, { useEffect } from 'react'
import axios from 'axios'
import {RiShuffleFill,RiSkipBackFill,RiPlayCircleFill,RiPauseCircleFill,RiSkipForwardFill,RiRepeat2Fill} from 'react-icons/ri'
import { useStateProvider } from '../utils/StateProvider'
import { spotifyAPI } from '../utils/spotify'
import { reducerCases } from '../utils/Constants'

const PlayerControls = () => {
  const [{token, playbackState},dispatch] = useStateProvider();
  
  useEffect(()=>{
    const getPlayerState = async()=>{
      const response = await axios.get(`${spotifyAPI}me/player`,{
        headers:{
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
      })
      console.log(response);
      const {data} = response;
      const playbackState = {
        isPlaying: data.is_playing,
        repeatState: data.repeat_state,
        shuffleState: data.shuffle_state
      }
      dispatch({type: reducerCases.SET_PLAYER_STATE, playbackState})
    }
    getPlayerState();
  },[]);

  const changeState = async () => {
    const state = playbackState.isPlaying ? "pause" : "play";
    await axios.put(`${spotifyAPI}me/player/${state}`,{},{
      headers:{
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
      }
    })
    dispatch({type:reducerCases.SET_PLAYER_STATE, playbackState: {...playbackState, isPlaying: !playbackState.isPlaying}})
  }

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log('下一首');
    //取得新track
    const respose = await axios.get(`${spotifyAPI}me/player/currently-playing`,{
      headers:{
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
      }
    })
    if(respose.data !== ""){
        const {item} = respose.data;
        const currentlyPlaying = {
            id: item.id,
            name: item.name,
            artists: item.artists.map((artist)=>(artist.name)),
            image: item.album.images[2].url,                  
        }
        dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
    }else{
      dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying: null});
    }
  };

  return (
    <div className='max-w-[400px]'>
        <div className='text-3xl flex justify-center items-center gap-3'>
          <button><RiShuffleFill className='text-xl'/></button>
          <button onClick={()=>changeTrack('previous')}><RiSkipBackFill/></button>
          <button onClick={()=>changeState()} className='text-5xl'>{playbackState && (playbackState.isPlaying? <RiPauseCircleFill/>: <RiPlayCircleFill/>)}</button>
          <button onClick={()=>changeTrack('next')}><RiSkipForwardFill/></button>
          <button><RiRepeat2Fill className='text-xl'/></button>
        </div>
        <div></div>
      </div>
  )
}

export default PlayerControls
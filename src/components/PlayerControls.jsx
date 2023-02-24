import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import {RiShuffleFill,RiSkipBackFill,RiPlayCircleFill,RiPauseCircleFill,RiSkipForwardFill,RiRepeat2Fill} from 'react-icons/ri'
import { useStateProvider } from '../utils/StateProvider'
import { spotifyAPI } from '../utils/spotify'
import { reducerCases } from '../utils/Constants'

const PlayerControls = () => {
  const [{token, playbackState,currentlyPlaying,selectedPlaylist,currentlyPlayingIndex,volume},dispatch] = useStateProvider();
  const audioRef = useRef(null); 
  
  useEffect(()=>{
    if(audioRef.current){
      audioRef.current.volume = volume;
    } 
  },[volume])
  
  useEffect(()=>{
    if(audioRef.current){
      audioRef.current.play();
      dispatch({type:reducerCases.SET_PLAYER_STATE, playbackState: true})
    }
  },[currentlyPlaying])
  
  const changeState = () => {
    if(!currentlyPlaying){
      dispatch({type:reducerCases.SET_PLAYING, currentlyPlaying: selectedPlaylist.tracks[currentlyPlayingIndex]})
    }
    const state = playbackState;
    if(playbackState){
      audioRef.current.pause();
    }else{
      audioRef.current.play();
      audioRef.current.volume = volume;
    }

    dispatch({type:reducerCases.SET_PLAYER_STATE, playbackState: !state})
  }

  const changeTrack = (type) =>{
    if(type === 'next' && currentlyPlayingIndex < selectedPlaylist.tracks.length-1){
      let newIndex = currentlyPlayingIndex + 1;
      dispatch({type:reducerCases.SET_PLAYING, currentlyPlaying: selectedPlaylist.tracks[newIndex]})
      dispatch({type:reducerCases.SET_PLAYING_INDEX, currentlyPlayingIndex: newIndex})
    }else if(type === 'previous' && currentlyPlayingIndex > 0){
      let newIndex = currentlyPlayingIndex - 1;
      dispatch({type:reducerCases.SET_PLAYING, currentlyPlaying: selectedPlaylist.tracks[newIndex]})
      dispatch({type:reducerCases.SET_PLAYING_INDEX, currentlyPlayingIndex: newIndex})
    }
  }

  // useEffect(()=>{
  //   const getPlayerState = async()=>{
  //     const response = await axios.get(`${spotifyAPI}me/player`,{
  //       headers:{
  //           Authorization: 'Bearer ' + token,
  //           'Content-Type': 'application/json',
  //       }
  //     })
  //     console.log(response);
  //     const {data} = response;
  //     const playbackState = {
  //       isPlaying: data.is_playing,
  //       // repeatState: data.repeat_state,
  //       // shuffleState: data.shuffle_state 
  //     }
  //     dispatch({type: reducerCases.SET_PLAYER_STATE, playbackState})
  //   }
  //   getPlayerState();
  // },[currentlyPlaying]);

  // const changeTrack = async (type) => {
  //   await axios.post(
  //     `https://api.spotify.com/v1/me/player/${type}`,
  //     {},
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     }
  //   );
  //   console.log('下一首');
  //   //取得新track
  //   const respose = await axios.get(`${spotifyAPI}me/player/currently-playing`,{
  //     headers:{
  //         Authorization: 'Bearer ' + token,
  //         'Content-Type': 'application/json'
  //     }
  //   })
  //   if(respose.data !== ""){
  //       const {item} = respose.data;
  //       const currentlyPlaying = {
  //           id: item.id,
  //           name: item.name,
  //           artists: item.artists.map((artist)=>(artist.name)),
  //           image: item.album.images[2].url,                  
  //       }
  //       dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
  //   }else{
  //     dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying: null});
  //   }
  // };

  return (
    <div className='max-w-[400px]'>
        {currentlyPlaying && <audio src={currentlyPlaying.preview_url} ref={audioRef} onEnded={()=>{changeTrack('next')}}/>}
        <div className='text-3xl flex justify-center items-center gap-3'>
          <button><RiShuffleFill className='text-xl'/></button>
          <button onClick={()=>changeTrack('previous')}><RiSkipBackFill/></button>
          <button onClick={()=>changeState()} className='text-5xl'>{playbackState? <RiPauseCircleFill/>: <RiPlayCircleFill/>}</button>
          <button onClick={()=>changeTrack('next')}><RiSkipForwardFill/></button>
          <button><RiRepeat2Fill className='text-xl'/></button>
        </div>
        <div></div>
      </div>
  )
}

export default PlayerControls
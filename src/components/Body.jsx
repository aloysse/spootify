import axios from 'axios'
import React, { useEffect } from 'react'
import { reducerCases } from '../utils/Constants'
import { spotifyAPI } from '../utils/spotify'
import { useStateProvider } from '../utils/StateProvider'
import {RiPlayFill,RiTimeLine,RiPauseFill} from 'react-icons/ri'

const Track = ({index,id,image,name,artists,album,duration,preview_url,setCurrentTrack}) =>{
  return (
    <div onClick={()=>{setCurrentTrack(id,name,artists,image,preview_url,index)}} className='grid grid-cols-[40px_1fr_1fr_80px] w-full items-center text-sm text-gray-400 hover:bg-gray-700 rounded'>
      <div className='p-2 text-center'>{index+1}</div>
      <div className='p-2 flex items-center min-w-[10px]'>
        <img className='w-14 mr-4' src={image} alt={name} />
        <div className='min-w-[10px]'>
          <p className='text-base text-white whitespace-nowrap overflow-hidden text-ellipsis mb-1' >{name}</p>
          <p>{artists}</p>
        </div>
      </div>
      <div className='p-2 overflow-hidden text-ellipsis whitespace-nowrap'>{album}</div>
      <div className='p-2 '>{duration}</div>
    </div>
  )
}

const Body = () => {
  const [{selectedPlaylistId,playbackState,currentlyPlayingIndex,currentlyPlaying,selectedPlaylist,token},dispatch] = useStateProvider()

  useEffect(() => {
    const getIntialPlayList = async()=>{
      const response = await axios.get(`${spotifyAPI}playlists/${selectedPlaylistId}`,{
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")? "": response.data.description,
        image : response.data.images[0].url,
        tracks: response.data.tracks.items.map(({track})=>({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist)=> artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
          preview_url: track.preview_url
        }))
      }
      dispatch({type: reducerCases.SET_PLAYLIST,
        selectedPlaylist
      })
    }
    getIntialPlayList()
  },[token,dispatch,selectedPlaylistId])


  // 將毫秒計算為時間
  const msToMinAndSec = (ms,type)=>{
    const hr = Math.floor(ms/ 3600000)
    const min = ((ms % 3600000) / 60000).toFixed(0)
    const sec = ((ms % 60000) / 1000).toFixed(0);
    if(type==='colon'){
      return `${hr > 0 ? hr +':' : ''}${min}:${sec < 10 ? '0' + sec : sec}`
    }else{
      return `${hr > 0 ? hr + '小時' : ''}${min}分鐘`
    }
  }

  const setCurrentTrack = (id,name,artists,image,preview_url,index) => {
    const currentlyPlaying = {
      id,
      name,
      artists,
      image,
      preview_url     
  }
  dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
  dispatch({type: reducerCases.SET_PLAYING_INDEX, currentlyPlayingIndex: index});
  }


  return (<>
   {selectedPlaylist &&
    (<div className="flex flex-col text-white absolute w-full">
      <div className="p-8 flex">
        <img className=" w-[200px] mr-8" src={selectedPlaylist.image} alt={selectedPlaylist.name} />
        <div className="flex flex-col justify-end">
          <h1 className="text-5xl font-black mb-10">
            {selectedPlaylist.name}
          </h1>
          <p>
            {selectedPlaylist.tracks.length} 首歌曲,{' '}
            <span className="text-gray-300">
              {msToMinAndSec(selectedPlaylist.tracks.map((item)=>item.duration).reduce((a,b)=>a + b))}
            </span>
          </p>
        </div>
      </div>
      <div className='bg-gray-900 p-8'>
        <div className='flex'>
          {/* <button onClick={changeState} className=' bg-green-700 text-4xl rounded-full p-3 mb-5'>{playbackState ? <RiPauseFill/> :<RiPlayFill/>}</button> */}
        </div>
        <div className='w-full'>
          <div className='grid sticky top-0 grid-cols-[40px_1fr_1fr_80px] bg-gray-900 text-sm text-gray-400 border-b border-gray-700 mb-5'>
            <div className='p-2 text-center'>#</div>
            <div className='p-2'>標題</div>
            <div className='p-2'>專輯</div>
            <div className='p-2'><RiTimeLine/></div>
          </div>
          {selectedPlaylist.tracks.map(({id,image,name,artists,album,duration,preview_url},index)=>(
            <Track key={id} setCurrentTrack={setCurrentTrack} id={id} preview_url={preview_url} index={index} image={image} name={name} artists={artists} album={album} duration={msToMinAndSec(duration,'colon')}/>
          ))}
        </div>
      </div>
    </div>)}
  </>
  )
}

export default Body
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { reducerCases } from '../utils/Constants'
import { spotifyAPI } from '../utils/spotify'
import { useStateProvider } from '../utils/StateProvider'
import {RiPlayFill,RiTimeLine} from 'react-icons/ri'



const Body = () => {
  const [{selectedPlaylistId,selectedPlaylist,token},dispatch] = useStateProvider()
  const [ formatDuration, setFormatDuration] = useState({});

  useEffect(() => {
    const getIntialPlayList = async()=>{
      const response = await axios.get(`${spotifyAPI}playlists/${selectedPlaylistId}`,{
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      // console.log(response)
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
          track_number: track.track_number
        }))
      }
      // console.log(selectedPlaylist)
      dispatch({type: reducerCases.SET_PLAYLIST,
        selectedPlaylist
      })
    }
    getIntialPlayList()
  },[token,dispatch,selectedPlaylistId])

  return (<>
   {selectedPlaylist &&
    (<div className="flex flex-col text-white absolute">
      <div className="p-8 flex">
        <img className=" w-[200px] mr-8" src={selectedPlaylist.image} alt={selectedPlaylist.name} />
        <div className="flex flex-col justify-end">
          <h1 className="text-5xl font-black mb-10">
            {selectedPlaylist.name}
          </h1>
          <p>
            {selectedPlaylist.tracks.length} 首歌曲,{' '}
            <span className="text-gray-300">
           總共幾小時？
            </span>
          </p>
        </div>
      </div>
      <div className='bg-gray-900 p-8'>
        <div className='flex'>
          <div className=' bg-green-700 text-4xl rounded-full p-3'><RiPlayFill/></div>
        </div>
        <div className='w-full'>
          <div className='grid grid-cols-[30px_1fr_1fr_80px] text-sm text-gray-400 border-b border-gray-700 mb-5'>
            <div className='p-2'>#</div>
            <div className='p-2'>標題</div>
            <div className='p-2'>專輯</div>
            <div className='p-2'><RiTimeLine/></div>
          </div>
          {selectedPlaylist.tracks.map((track,index)=>(
            <div key={track.id} className='grid grid-cols-[30px_1fr_1fr_80px] items-center text-sm text-gray-400'>
              <div className='p-2'>{index+1}</div>
              <div className='p-2 flex items-center'>
                <img className='w-14 mr-4' src={track.image} alt={track.name} />
                <div className='w-[200px]'>{/*待改*/}
                  <p className='text-base text-white whitespace-nowrap overflow-hidden text-ellipsis mb-1' >{track.name}</p>
                  <p>{track.artists}</p>
                </div>
                </div>
              <div className='p-2 overflow-hidden text-ellipsis whitespace-nowrap'>{track.album}</div>
              <div className='p-2 '>{track.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>)}
  </>
  )
}

export default Body
import React, { useEffect } from 'react'
import axios from 'axios'
import { spotifyAPI } from '../utils/spotify'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants'


const CurrentTrack = () => {

    const [{token, currentlyPlaying}, dispatch] = useStateProvider();

    useEffect(()=>{
        const getCurrentTrack = async() =>{
            const respose = await axios.get(`${spotifyAPI}me/player/currently-playing`,{
                headers:{
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            // console.log(respose);
            if(respose.data !== ""){
                const {item} = respose.data;
                console.log('current',item)
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist)=>(artist.name)),
                    image: item.album.images[2].url,
                }
                dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
            }
        }
        getCurrentTrack();
    },[token,dispatch])


    useEffect(()=>{
        console.log('currentlyPlaying',currentlyPlaying)
        const getRecentlyTrack = async() =>{
            const respose = await axios.get(`${spotifyAPI}me/player/recently-played`,{
                headers:{
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            if(respose.data !== ""){
                const {items} = respose.data;
                console.log('recent',items)
                const currentlyPlaying = {
                    id: items[0].track.id,
                    name: items[0].track.name,
                    artists: items[0].track.artists.map((artist)=>(artist.name)),
                    image: items[0].track.album.images[2].url,
                    preview_url: items[0].track.preview_url     
                }
                dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
            }
        }
        getRecentlyTrack();
    },[token,dispatch])

    return (<div> {
        currentlyPlaying && (
            <div className='p-2 flex items-center'>
            <img className='w-14 mr-4' src={currentlyPlaying.image} alt={currentlyPlaying.name}/>
            <div className='w-[200px]'>{/*待改*/}
              <p className='text-base text-white whitespace-nowrap overflow-hidden text-ellipsis mb-1' >{currentlyPlaying.name}</p>
              <p className='text-sm text-gray-400'>{currentlyPlaying.artists}</p>
            </div>
          </div>
        )
    }
      </div>
  )
}

export default CurrentTrack
import React,{useEffect} from 'react'
import axios from 'axios'
import { useStateProvider } from '../utils/StateProvider'
import {spotifyAPI} from '../utils/spotify'
import { reducerCases } from '../utils/Constants'

const PlayLists = () => {

    const[{token,playlists},dispatch] = useStateProvider();

    useEffect(() =>{
        const getPlayListData = async () => {
            const response = await axios.get(`https://api.spotify.com/v1/me/playlists`,{
                headers:{
                    Authorization: 'Bearer ' + token,
                    "Content-Type": 'application/json'
                }
            });
            const {items} = response.data;
            const playlists = items.map(({name,id})=>({name,id}))
            dispatch({
                type:reducerCases.SET_PLAYLISTS,
                playlists
            })
        }
        getPlayListData();
        }
    ,[token,dispatch])
  return (
    <div className='relative h-full overflow-y-auto scrollbar-hide'>
        <ul className='absolute w-full'>
        {playlists.map(({name,id})=>(
            <li key={id} className="whitespace-nowrap text-ellipsis overflow-hidden mb-3">{name}</li>
        ))}
        </ul></div>
  )
}

export default PlayLists
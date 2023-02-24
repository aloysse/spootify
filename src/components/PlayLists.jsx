import React,{useEffect,useState} from 'react'
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
            const playlists = items.map(({name,id})=>({name,id,actived:false}))
            dispatch({
                type:reducerCases.SET_PLAYLISTS,
                playlists
            })
        }
        getPlayListData();
        }
    ,[token,dispatch])

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({type: reducerCases.SET_PLAYINGLIST_ID, selectedPlaylistId})
        playlists.forEach(item => {
            if(item.id === selectedPlaylistId){
                item.actived = true;
            }else{
                item.actived = false;
            }
        });
        dispatch({
            type:reducerCases.SET_PLAYLISTS,
            playlists
        })
    }

  return (
    <div className='relative h-full overflow-y-auto scrollbar-hide'>
        <ul className='absolute w-full'>
        {playlists.map(({name,id,actived})=>{
            // const [actived] = activedItems.filter(item=>item.id===id);
            // console.log(activedItems);
            return <li onClick={()=>changeCurrentPlaylist(id)} key={id} className={`whitespace-nowrap text-ellipsis overflow-hidden mb-3 ${actived ? 'text-gray-100' :'text-gray-400'} hover:text-white cursor-pointer`}>{name}</li>
        })}
        </ul></div>
  )
}

export default PlayLists
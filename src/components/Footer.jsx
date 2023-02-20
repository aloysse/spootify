import React from 'react'
import CurrentTrack from './CurrentTrack'
import PlayerControls from './PlayerControls'

const Footer = () => {
  return (
    <div className='bg-gray-900 border-t border-gray-700 text-white h-full grid grid-cols-3 items-center p-3'>
      <CurrentTrack/>
      <PlayerControls/>
      <div></div>
    </div>
  )
}

export default Footer
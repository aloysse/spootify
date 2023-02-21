import React from 'react'
import CurrentTrack from './CurrentTrack'
import PlayerControls from './PlayerControls'
import Volume from './Volume'

const Footer = () => {
  return (
    <div className='bg-gray-900 border-t border-gray-700 text-white h-full grid grid-cols-3 items-center p-3'>
      <CurrentTrack/>
      <PlayerControls/>
      <Volume/>
    </div>
  )
}

export default Footer
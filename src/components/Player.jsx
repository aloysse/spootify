import React from 'react'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Body from './Body'
import Navbar from './Navbar'

const Player = () => {
  return (
    <div className='w-screen h-screen grid grid-rows-[85vh_15vh] overflow-hidden'>
      <div className='grid grid-cols-[200px_1fr] h-full w-full bg-gradient-to-t from-slate-500 to-blue-900'>
        <Sidebar / >
          <div>
            <Navbar/>
            <div className='w-full h-full overflow-auto'>
              <Body/>
            </div>
          </div>
      </div>
      <div><Footer/></div>
    </div>
  )
}

export default Player
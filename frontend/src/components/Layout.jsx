import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='min-h-screen bg-zinc-950 flex text-zinc-100'>
      <Outlet></Outlet>
    </div>
  )
}

export default Layout

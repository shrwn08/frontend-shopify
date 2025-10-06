import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div className='max-w-screen min-h-screen overflow-hidden bg-[#FFFFFF] flex flex-col justify-between items-center'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout
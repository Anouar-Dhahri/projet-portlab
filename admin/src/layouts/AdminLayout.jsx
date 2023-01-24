import React from 'react'
import { Sidebar, Navbar } from './../components'
import { Outlet } from 'react-router-dom'

import './AdminLayout.css'

function AdminLayout() {
  return (
    <div className='layout'>
      <Sidebar />
      <div className='layout__content'>
        <Navbar />
        <div className="layout__content-main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
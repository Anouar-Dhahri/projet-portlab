import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from './../../assets/images/logo.png'
import './Sidebar.css'

function Sidebar() {

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" className='logo-img'/>
        <span className="logo-name">PortsLab</span>
      </div>

      <div className="sidebar-content">
        <ul className="lists">
          <Link to='/admin/dashboard'>
            <li className="list">
              <span  className="nav-link">
                <i className="bx bx bxs-dashboard icon"></i>
                <span className="link">Dashboard</span>
              </span>
            </li>
          </Link>

          <Link to='/admin/users'>
            <li className="list">
              <span  className="nav-link">
                <i className="bx bx-user icon"></i>
                <span className="link">Users</span>
              </span>
            </li>
          </Link>

          <Link to='/admin/clients'>
            <li className="list">
              <span  className="nav-link">
                <i className="bx bx-user-pin icon"></i>
                <span className="link">Clients</span>
              </span>
            </li>
          </Link>

          <Link to='/admin/ports'>
            <li className="list">
              <span className="nav-link">
                <i className="bx bx bxs-analyse icon"></i>
                <span className="link">Ports</span>
              </span>
            </li>
          </Link>

          <Link to='/admin/ships'>
            <li className="list" >
              <span className="nav-link">
                <i className="bx bxs-ship icon"></i>
                <span className="link">Ships</span>
              </span>
            </li>
          </Link>

          <Link to='/admin/history'>
            <li className="list" >
              <span className="nav-link">
                <i className="bx bx-history icon"></i>
                <span className="link">Users Traces</span>
              </span>
            </li>
          </Link>

        </ul>
      </div>
    </div>
  )
}

export default Sidebar
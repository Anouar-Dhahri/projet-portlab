import React from 'react'
import { BrowserRouter, Routes, Route }from 'react-router-dom'
import {
  ClientList,
  ClientForm,
  Dashboard, 
  Login, 
  PortForm,
  PortList,
  Profile,
  ShipForm, 
  ShipList, 
  UserForm, 
  UserList, 
  UsersTrace
} from '../views'
import AdminLayout  from '../layouts/AdminLayout'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />

        <Route path='/admin' element={<AdminLayout />}>

          <Route path='dashboard' element={<Dashboard />}/>

          <Route path='users' element={<UserList />}/>
          <Route path='adduser' element={<UserForm />}/>
          <Route path='edituser/:id' element={<UserForm />}/>

          <Route path='clients' element={<ClientList />}/>
          <Route path='addclient' element={<ClientForm />}/>
          <Route path='editclient/:id' element={<ClientForm />}/>

          <Route path='ports' element={<PortList />}/>
          <Route path='addport' element={<PortForm />}/>
          <Route path='editport/:id' element={<PortForm />}/>

          <Route path='ships' element={<ShipList />}/>
          <Route path='addship' element={<ShipForm />}/>
          <Route path='editship/:id' element={<ShipForm />}/>

          <Route path='history' element={<UsersTrace />}/>

          <Route path='profile' element={<Profile />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
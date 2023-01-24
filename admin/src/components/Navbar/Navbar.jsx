import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import userLogo from './../../assets/images/user.png'

function Navbar() {

  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }
  
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Administrator
          </Typography>
          <IconButton onClick={handleMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={userLogo} /> 
            <Typography color="white" variant="subtitle2">{ user.nom + ' '+ user.prenom}</Typography> 
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <Link to='/admin/profile'>Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
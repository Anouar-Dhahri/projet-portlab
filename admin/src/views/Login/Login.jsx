import React, {useState} from 'react'
import { Container, Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { API } from '../../configs';
import logo from './../../assets/images/logo.png'
import './Login.css'

function Login() {
  
  const logoStyle = {
    width:'150px',
    height:'150px'
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email){
      toast.error('Email is required !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }else if(!password){
      toast.error('Password is required !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }else {
      await axios.post(`${API}/admin/login`, {
        email: email,
        password: password
      }).then((result) => {
        if(result.data.success) {
          toast.success(result.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          localStorage.setItem('token', result.data.token)
          localStorage.setItem('user', JSON.stringify(result.data.user))
          navigate('/admin/dashboard')
        }else {
          toast.error(result.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
    }

  }
  return (
    <div className='loginContainer'>
      <Container maxWidth="xs" sx={{backgroundColor:'#FFF', borderRadius:'10px'}}>
        <Box sx={{
          marginTop:16,
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          bgColor:'#FFFFFF'
        }}>
          <img src={logo} style={logoStyle} alt='logo' />    
        </Box>
        <Box component='form'>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            variant="filled"
            onChange={(e)=> {setEmail(e.target.value)}}
          />
          <TextField
            margin="normal"
            required
            variant="filled"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=> {setPassword(e.target.value)}}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{mt:3, mb:2}}
            size='large'
            onClick={handleSubmit}
          >
            LOGIN
          </Button>
        </Box>
      </Container>
    </div>
  )
}

export default Login
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  TextField, 
  Button,
  Grid,
  Box, 
  Paper,
  Typography
} from '@mui/material'
import { Send, Clear} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { API } from '../../configs';
import './Profile.css' 

function Profile() {

  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {id} = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!nom || !prenom  || !email || !password) {
      toast.error("All field required", {
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
      await axios.put(`${API}/auth/profile/${id}`)
      .then((res) => {
        if(res.data.success) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
  
          navigate('')
        }else {
          toast.error(res.data.message, {
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
    <Box sx={{ width: '100%'}}>
      <Paper sx={{ width: '100%', mb: 2, minHeight:'400px', padding:2 }}>
        <Typography variant="h3">Profile</Typography>
        <div className='formContainer'>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  id="filled-basic"
                  label="Nom"
                  defaultValue=""
                  variant="filled"
                  onChange={(e) =>setNom(e.target.value) }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  id="filled-basic"
                  label="Prénom"
                  defaultValue=""
                  variant="filled"
                  onChange={(e) =>setPrenom(e.target.value) }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  id="filled-basic"
                  label="Email"
                  type="email"
                  defaultValue=""
                  variant="filled"
                  onChange={(e) =>setEmail(e.target.value) }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  id="filled-basic"
                  label="Password"
                  type="password"
                  defaultValue=""
                  variant="filled"
                  onChange={(e) =>setPassword(e.target.value) }
                />
              </Grid>
              <Grid item xs={6}>
                <Button 
                  type="submit" 
                  variant="outlined" 
                  startIcon={<Send />} 
                  size="large"
                  sx={{
                    marginRight:'20px'
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button 
                  type="reset" 
                  variant="outlined"  
                  startIcon={<Clear />}
                  size="large"
                >
                  Annuler
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </Box>
  )
}

export default Profile
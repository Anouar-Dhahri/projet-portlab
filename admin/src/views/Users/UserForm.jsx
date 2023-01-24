import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  TextField, 
  Button,
  Grid,
  Box, 
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import { Send, Clear } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { API } from '../../configs';
import axios from 'axios'

function UserForm() {

  const [action, setAction] = useState('')
  const [title, setTitle] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('')

  const {id} = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if(!id){
      setAction("add")
      setTitle("Ajouter Nouveau Utilisateur")
      console.log("add")
    }else {
      setAction("edit")
      setTitle("Modifier Utilisateur")
      console.log("edit")
    }
  }, [id])
  
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
      if(action === "add") {
        await axios.post(`${API}/users/create`,{
          nom: nom,
          prenom:prenom,
          email: email,
          password: password,
          type: type,
        })
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
    
            navigate('/admin/users')
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
      }else {
        await axios.put(`${API}/users/update/${id}`, {
          nom: nom,
          prenom:prenom,
          email: email,
          password: password,
          type: type
        })
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
    
            navigate('/admin/users')
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
  }

  return (
    <Box sx={{ width: '100%'}}>
    <Paper sx={{ width: '100%', mb: 2, minHeight:'400px', padding:2 }}>
      <Typography variant="h4">{ title }</Typography>
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="TYpe"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value="Agent Saisie">Agent Saisie</MenuItem>
                  <MenuItem value="Responsable import / Export">Responsable import / Export</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}></Grid>
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

export default UserForm
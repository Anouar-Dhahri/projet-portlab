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

function ShipForm() {

  const [action, setAction] = useState('')
  const [title, setTitle] = useState('')
  const [ clients, setClients] = useState([])

  const [clientId, setClientId] = useState('')
  const [nom, setNom] = useState('')
  const [tonnage, setTonnage] = useState('')

  const {id} = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    FetchAPI()
    if(!id){
      setAction("add")
      setTitle("Ajouter Nouveau Bateau")
      console.log("add")
    }else {
      setAction("edit")
      setTitle("Modifier Bateau")
      console.log("edit")
    }
  }, [id])
  
  const FetchAPI = async () => {
    await axios.get(`${API}/clients/get`)
    .then((res) => {
      if(res.data.success) {
        setClients(res.data.clients)
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!clientId || !nom  || !tonnage ) {
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
        await axios.post(`${API}/ships/create`,{
          clientId:clientId,
          nom:nom,
          tonnage:tonnage
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
    
            navigate('/admin/ships')
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
        await axios.put(`${API}/ships/update/${id}`,{
          clientId:clientId,
          nom:nom,
          tonnage:tonnage
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
    
            navigate('/admin/ships')
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
      <Typography variant="h3">{title}</Typography>
      <div className='formContainer'>
        <form>
          <Grid container spacing={2}>
          <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={clientId}
                  label="Client"
                  onChange={(e) => setClientId(e.target.value)}
                >
                  <MenuItem>Clients</MenuItem>
                  {
                    clients.map((client) => (
                      <MenuItem key={client._id} value={client._id}>{client.companie}</MenuItem>
                    ))
                  }

                </Select>
              </FormControl>
            </Grid>
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
                label="Tonnage"
                type="number"
                defaultValue=""
                variant="filled"
                onChange={(e) =>setTonnage(e.target.value) }
              />
            </Grid>
            <Grid item xs={6}>

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

export default ShipForm
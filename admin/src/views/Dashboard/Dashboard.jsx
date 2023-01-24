import React, { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CardActionArea 
} from '@mui/material';
import './Dashboard.css'
import axios from 'axios'
import { API } from './../../configs'

function Dashboard() {

  const [users, setUsers] = useState(0)
  const [clients, setClients] = useState(0)
  const [ports, setPorts] = useState(0)
  const [ships, setShips] = useState(0)

  useEffect(() => {
    fetchAPI()
  },[])

  const fetchAPI = async () => {
    await axios.get(`${API}/data/counter`)
    .then((res) => {
      if(res.data.success) {
        setUsers(res.data.users)
        setClients(res.data.clients)
        setPorts(res.data.ports)
        setShips(res.data.ships)
      }
    })
  }

  return (
    <div className="container">
      <Card sx={{ width: '25%', margin:2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="https://st2.depositphotos.com/1814366/10459/i/600/depositphotos_104596660-stock-photo-customer-support-operators-in-formalwear.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom align='center' variant="h4" component="div">
              {users}
            </Typography>
            <Typography align='center' variant="h6" color="text.secondary">
              Users
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ width: '25%', margin:2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="https://wallpaperaccess.com/full/4690914.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom align='center' variant="h4" component="div">
              {clients}
            </Typography>
            <Typography align='center' variant="h6" color="text.secondary">
              Clients
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ width: '25%', margin:2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="https://wallpapercave.com/wp/wp2497410.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom align='center' variant="h4" component="div">
              { ports}
            </Typography>
            <Typography align='center' variant="h6" color="text.secondary">
              Ports
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ width: '25%', margin:2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="https://wallpaperaccess.com/full/1912005.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom align='center' variant="h4" component="div">
              { ships }
            </Typography>
            <Typography align='center' variant="h6" color="text.secondary">
              Ships
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default Dashboard
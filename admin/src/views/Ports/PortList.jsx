import React, { useState, useEffect } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  Paper,
  Box, 
  Button,
  Menu,
  Fab,
  MenuItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { MoreVert, Edit, Delete, Add } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios'
import { API } from './../../configs'

function PortList() {

  const [ports, setPorts] = useState([])

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  useEffect(() => {
    FetchAPI()
  },[])

  const FetchAPI = async () => {
    await axios.get(`${API}/ports/get`)
    .then((res) => {
      if(res.data.success) {
        setPorts(res.data.ports)
      }
    })
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const updatePort = (id) => {
    navigate(`/admin/editport/${id}`)
  }

  const deletePort = async (id) => {
    await axios.delete(`${API}/ports/remove/${id}`)
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
        FetchAPI()
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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Nom</TableCell>
                <TableCell align="right">Ville</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="right">{row.nom}</TableCell>
                    <TableCell align="right">{row.ville}</TableCell>
                    <TableCell align="right">{row.country}</TableCell>
                    <TableCell align="right">
                      {
                        new Date(row.createdAt).toLocaleDateString()+' '+new Date(row.createdAt).toLocaleTimeString()
                      }
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        <MoreVert />
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={() => updatePort(row._id)}>
                          <ListItemIcon>
                            <Edit />
                          </ListItemIcon>
                          <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => deletePort(row._id)}>
                          <ListItemIcon>
                            <Delete />
                          </ListItemIcon>
                          <ListItemText>Delete</ListItemText>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Link to="/admin/addport">
        <Fab 
          color="primary" 
          aria-label="add" 
          style={{
            position:'absolute', 
            right:0, 
            bottom:0, 
            margin:'30px'
          }}
        >
          <Add />
        </Fab>
      </Link>
    </Box>
  )
}

export default PortList
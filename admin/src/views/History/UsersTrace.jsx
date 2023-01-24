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
  Box
} from '@mui/material';
import axios from 'axios'
import { API } from './../../configs'

function UsersTrace() {

  const [traces, setTraces] = useState([])

  const [users, setUsers] = useState([])

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    FetchAPI()
  },[])

  const FetchAPI = async () => {
    await axios.get(`${API}/users/get`)
    .then((res) => {
      if(res.data.success) {
        setUsers(res.data.users)
      }
    })

    await axios.get(`${API}/traces/get`)
    .then((res) => {
      if(res.data.success) {
        setTraces(res.data.history)
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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Account Type</TableCell>
                <TableCell align="right">Actions</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {traces
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="right">
                      {
                        users.map((user) => (
                          user._id === row.userId ? user.nom +' '+user.prenom : ''
                        ))
                        
                      }
                    </TableCell>
                    <TableCell align="right">
                    {
                        users.map((user) => (
                          user._id === row.userId ? user.type : ''
                        ))
                        
                      }
                    </TableCell>

                    <TableCell align="right">{row.action}</TableCell>

                    <TableCell align="right">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    
                    <TableCell align="right">{new Date(row.createdAt).toLocaleTimeString()}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={traces.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default UsersTrace
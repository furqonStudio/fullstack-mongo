import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ToastContainer } from 'react-toastify'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
  Box,
  Typography,
} from '@mui/material'

const UserList = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const { data } = await axios.get('http://localhost:3000/users')
    setUsers(data)
  }

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })

    if (result.isConfirmed) {
      await axios.delete(`http://localhost:3000/users/${id}`)
      getUsers()

      Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" p={2}>
        User List Table
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          size="small"
          component={Link}
          to="/add"
        >
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table ">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell sx={{ width: '30%' }}>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mr: 1 }}
                    component={Link}
                    to={`edit/${user._id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                      deleteUser(user._id)
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer limit={1} />
    </Container>
  )
}

export default UserList

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import {
  Container,
  TextField,
  Box,
  Stack,
  Button,
  MenuItem,
  Typography,
} from '@mui/material'

const AddUser = () => {
  const notify = () =>
    toast.success('User successfully added!', {
      toastId: 'success1',
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('Male')
  const navigate = useNavigate()

  const saveUser = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3000/users', { name, email, gender })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" p={2}>
        Add User Form
      </Typography>
      <Stack component="form" autoComplete="off" gap={2} onSubmit={saveUser}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          label="Name"
          variant="outlined"
          required
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          required
        />
        <TextField
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          id="gender"
          select
          label="Gender"
          required
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mr: 2 }}
            onClick={notify}
          >
            Add User
          </Button>
          <Button
            variant="contained"
            color="error"
            type="submit"
            component={Link}
            to="/"
          >
            Cancel
          </Button>
        </Box>
      </Stack>
    </Container>
  )
}

export default AddUser

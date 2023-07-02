import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'

import {
  Container,
  TextField,
  Box,
  Stack,
  Button,
  MenuItem,
  Typography,
} from '@mui/material'

const EditUser = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('Male')
  const navigate = useNavigate()

  const getUser = async () => {
    const { data } = await axios.get(`http://localhost:3000/users/${id}`)
    setName(data.name)
    setEmail(data.email)
    setGender(data.gender)
    console.log(data)
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editUser = async (e) => {
    e.preventDefault()

    try {
      await axios.patch(`http://localhost:3000/users/${id}`, {
        name,
        email,
        gender,
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" p={2}>
        Edit User Form
      </Typography>
      <Stack component="form" autoComplete="off" gap={2} onSubmit={editUser}>
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
          >
            Edit User
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

export default EditUser

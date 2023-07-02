import UserList from './components/UserList'
import AddUser from './components/AddUser'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditUser from './components/EditUser'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="add" element={<AddUser />} />
        <Route path="edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  )
}

export default App

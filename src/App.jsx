import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/auth.jsx'
import Home from './components/pages/Home'
import SignUp from './components/pages/SignUp/SignUp.jsx'
import Login from './components/pages/Login.jsx'
import User from './components/pages/User.jsx'
import Project from './components/pages/Project.jsx'
import Message from './components/pages/Message/Message.jsx'
import NewProject from './components/pages/NewProject/NewProject.jsx'
import AddTask from './components/pages/AddTask.jsx'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/user' element={<User />}></Route>
          <Route path='/project' element={<Project />}></Route>
          <Route path='/message' element={<Message />}></Route>
          <Route path='/newproject' element={<NewProject />}></Route>
          <Route path='/addtask' element={<AddTask />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

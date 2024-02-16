import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/auth.jsx'
import Home from './components/pages/Home/Home.jsx'
import SignUp from './components/pages/SignUp/SignUp.jsx'
import Login from './components/pages/Login/Login.jsx'
import User from './components/pages/User/User.jsx'
import Project from './components/pages/Project/Project.jsx'
import Message from './components/pages/Message/Message.jsx'
import NewProject from './components/pages/NewProject/NewProject.jsx'
import AddTask from './components/pages/AddTask/AddTask.jsx'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/zesty-frontend' element={<Home />}></Route>
          <Route path='/zesty-frontend/signup' element={<SignUp />}></Route>
          <Route path='/zesty-frontend/login' element={<Login />}></Route>
          <Route path='/zesty-frontend/user' element={<User />}></Route>
          <Route path='/zesty-frontend/project' element={<Project />}></Route>
          <Route path='/zesty-frontend/message' element={<Message />}></Route>
          <Route path='/zesty-frontend/newproject' element={<NewProject />}></Route>
          <Route path='/zesty-frontend/addtask' element={<AddTask />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

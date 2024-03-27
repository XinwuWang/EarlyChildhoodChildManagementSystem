import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Admin/Dashboard'
import Home from './Components/Admin/Home'
import Teachers from './Components/Admin/Teachers'
import Children from './Components/Admin/Children'
import Message from './Components/Admin/Message'
import Profile from './Components/Admin/Profile'
import AddTeacher from './Components/Admin/AddTeacher'
import CentreIntro from './Components/Admin/CentreIntro'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/manageteachers' element={<Teachers />}></Route>
          <Route path='/dashboard/managechildren' element={<Children />}></Route>
          <Route path='/dashboard/sendmessage' element={<Message />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/add_teacher' element={<AddTeacher />}></Route>
          <Route path='/dashboard/centreintro' element={<CentreIntro />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

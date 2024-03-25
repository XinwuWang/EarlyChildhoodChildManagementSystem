import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Teachers from './Components/Teachers'
import Children from './Components/Children'
import Message from './Components/Message'
import Profile from './Components/Profile'
import Category from './Components/Category'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/manageteachers' element={<Teachers />}></Route>
          <Route path='/dashboard/category' element={<Category />}></Route>
          <Route path='/dashboard/managechildren' element={<Children />}></Route>
          <Route path='/dashboard/sendmessage' element={<Message />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

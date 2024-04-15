import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminPortal from './Components/Admin/AdminPortal'
import TeacherPortal from './Components/Teacher/TeacherPortal'
import ChildPortal from './Components/Child/ChildPortal'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartPage from './Components/StartPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartPage />}></Route>
        <Route path='/admin/*' element={<AdminPortal />}></Route>
        <Route path='/teacher/*' element={<TeacherPortal />}></Route>
        <Route path='/child/*' element={<ChildPortal />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

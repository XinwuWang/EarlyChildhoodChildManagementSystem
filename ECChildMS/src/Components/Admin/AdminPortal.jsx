import Login from '../Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Home from './Home'
import Teachers from './Teachers'
import Children from './Children'
import Message from './Message'
import Profile from './Profile'
import AddTeacher from './AddTeacher'
import AddChild from './AddChild'
import CentreIntro from './CentreIntro'

const AdminPortal = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/dashboard' element={<Dashboard />}>
                    <Route path='' element={<Home />}></Route>
                    <Route path='/dashboard/manageteachers' element={<Teachers />}></Route>
                    <Route path='/dashboard/managechildren' element={<Children />}></Route>
                    <Route path='/dashboard/sendmessage' element={<Message />}></Route>
                    <Route path='/dashboard/profile' element={<Profile />}></Route>
                    <Route path='/dashboard/add_teacher' element={<AddTeacher />}></Route>
                    <Route path='/dashboard/add_child' element={<AddChild />}></Route>
                    <Route path='/dashboard/centreintro' element={<CentreIntro />}></Route>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AdminPortal
// This file to delete

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Home from './Home'
import Teachers from './Teachers'
import Children from './ChildrenInfo.jsx'
import Message from './Message'
import Profile from './Profile'
import AddTeacher from './AddTeacher'
import AddChild from './AddChild'
import CentreIntro from './CentreIntro'
import TeachingResource from './TeachingResource.jsx'
import Announcement from './Announcement.jsx'
import Note from './Note.jsx'
import AdminLogin from './AdminLogin.jsx'
import PrivateRoute from '../PrivateRoute.jsx'
import StartPage from '../StartPage.jsx'


const AdminPortal = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<StartPage />}></Route>
                <Route path='/admin_login' element={<AdminLogin />}></Route>
                <Route path='/dashboard' element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }>
                    <Route path='' element={<Home />}></Route>
                    <Route path='/dashboard/manageteachers' element={<Teachers />}></Route>
                    <Route path='/dashboard/managechildren' element={<Children />}></Route>
                    <Route path='/dashboard/sendmessage' element={<Message />}></Route>
                    <Route path='/dashboard/profile' element={<Profile />}></Route>
                    <Route path='/dashboard/teaching_resource' element={<TeachingResource />}></Route>
                    <Route path='/dashboard/announcement' element={<Announcement />}></Route>
                    <Route path='/dashboard/note' element={<Note />}></Route>
                    <Route path='/dashboard/add_teacher' element={<AddTeacher />}></Route>
                    <Route path='/dashboard/add_child' element={<AddChild />}></Route>
                    <Route path='/dashboard/centreintro' element={<CentreIntro />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AdminPortal
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartPage from './Components/StartPage'
// Admin components
import AdminLogin from './Components/Admin/AdminLogin'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Admin/Dashboard'
import Home from './Components/Admin/Home'
import Teachers from './Components/Admin/Teachers'
import Message from './Components/Admin/Message'
import Profile from './Components/Admin/Profile'
import TeachingResource from './Components/Admin/TeachingResource'
import Announcement from './Components/Admin/Announcement'
import Note from './Components/Admin/Note'
import AddTeacher from './Components/Admin/AddTeacher'
import AddChild from './Components/Admin/AddChild'
import CentreIntro from './Components/Admin/CentreIntro'
import ChildrenInfo from './Components/Admin/ChildrenInfo'
import EditProfile from './Components/Admin/EditProfile'
import ChangePassword from './Components/Admin/ChangePassword'
import EditCentreinfo from './Components/Admin/EditCentreinfo'
import AddCentreInfo from './Components/Admin/AddCentreInfo'

// Teacher components
import TeacherLogin from './Components/Teacher/TeacherLogin'
import TDashboard from './Components/Teacher/TDashboard'
import THome from './Components/Teacher/THome'
import ViewChildren from './Components/Teacher/ViewChildren'
import TProfile from './Components/Teacher/TProfile'
import TeachingTips from './Components/Teacher/TeachingTips'
import CentreInfo from './Components/Teacher/CentreInfo'
import GroupAnnon from './Components/Teacher/GroupAnnon'
import TodoList from './Components/Teacher/TodoList'
// Child components
import ChildLogin from './Components/Child/ChildLogin'
import CDashboard from './Components/Child/CDashboard'
import CHome from './Components/Child/CHome'
import ViewTeachers from './Components/Child/ViewTeachers'
import ChildMessage from './Components/Child/ChildMessage'
import CProfile from './Components/Child/CProfile'
import Documents from './Components/Child/Documents'
import Announce from './Components/Child/Announce'
import CentreInformation from './Components/Child/CentreInformation'
import Resource from './Components/Child/Resource'







function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Start page route */}
        <Route path='/' element={<StartPage />}></Route>
        {/* Admin portal */}
        <Route path='/admin_login' element={<AdminLogin />}></Route>
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/manageteachers' element={<Teachers />}></Route>
          <Route path='/dashboard/managechildren' element={<ChildrenInfo />}></Route>
          <Route path='/dashboard/sendmessage' element={<Message />}></Route>
          <Route path='/dashboard/profile/:id' element={<Profile />}></Route>
          <Route path='/dashboard/teaching_resource' element={<TeachingResource />}></Route>
          <Route path='/dashboard/announcement' element={<Announcement />}></Route>
          <Route path='/dashboard/note' element={<Note />}></Route>
          <Route path='/dashboard/add_teacher' element={<AddTeacher />}></Route>
          <Route path='/dashboard/add_child' element={<AddChild />}></Route>
          <Route path='/dashboard/centreintro' element={<CentreIntro />}></Route>
          <Route path='/dashboard/edit_profile/:id' element={<EditProfile />}></Route>
          <Route path='/dashboard/change_password/:id' element={<ChangePassword />}></Route>
          <Route path='/dashboard/edit_centreinfo/:id' element={<EditCentreinfo />}></Route>
          <Route path='/dashboard/add_centreinfo' element={<AddCentreInfo />}></Route>
        </Route>

        {/* Teacher portal */}
        <Route path='/teacher_login' element={<TeacherLogin />}></Route>
        <Route path='/teacher_dashboard' element={
          <PrivateRoute>
            <TDashboard />
          </PrivateRoute>
        }>
          <Route path='' element={<THome />}></Route>
          <Route path='/teacher_dashboard/view_children' element={<ViewChildren />}></Route>
          <Route path='/teacher_dashboard/message' element={<Message />}></Route>
          <Route path='/teacher_dashboard/teacher_profile' element={<TProfile />}></Route>
          <Route path='/teacher_dashboard/teaching_tips' element={<TeachingTips />}></Route>
          <Route path='/teacher_dashboard/centre_information' element={<CentreInfo />}></Route>
          <Route path='/teacher_dashboard/group_announcement' element={<GroupAnnon />}></Route>
          <Route path='/teacher_dashboard/to_do_list' element={<TodoList />}></Route>
        </Route>

        {/* Child portal */}
        <Route path='/child_login' element={<ChildLogin />}></Route>
        <Route path='/child_dashboard' element={<CDashboard />}>
          <Route path='' element={<CHome />}></Route>
          <Route path='/child_dashboard/view_teachers' element={<ViewTeachers />}></Route>
          <Route path='/child_dashboard/sendmessage' element={<ChildMessage />}></Route>
          <Route path='/child_dashboard/child_profile' element={<CProfile />}></Route>
          <Route path='/child_dashboard/documents' element={<Documents />}></Route>
          <Route path='/child_dashboard/announcement' element={<Announce />}></Route>
          <Route path='/child_dashboard/centreinfo' element={<CentreInformation />}></Route>
          <Route path='/child_dashboard/resource' element={<Resource />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

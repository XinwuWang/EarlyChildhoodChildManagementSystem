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
import AddTeacher from './Components/Admin/AddTeacher'
import AddChild from './Components/Admin/AddChild'
import CentreIntro from './Components/Admin/CentreIntro'
import ChildrenInfo from './Components/Admin/ChildrenInfo'
import EditProfile from './Components/Admin/EditProfile'
import ChangePassword from './Components/Admin/ChangePassword'
import EditCentreinfo from './Components/Admin/EditCentreinfo'
import AddCentreInfo from './Components/Admin/AddCentreInfo'
import Note from './Components/Admin/Note'
import AddNote from './Components/Admin/AddNote'
import EditNote from './Components/Admin/EditNote'
import CreateAnnouncement from './Components/Admin/CreateAnnouncement'
import TeacherDetail from './Components/Admin/TeacherDetail'
import EditTeacher from './Components/Admin/EditTeacher'
import ChildDetail from './Components/Admin/ChildDetail'
import EditChild from './Components/Admin/EditChild'

// Teacher components
import TeacherLogin from './Components/Teacher/TeacherLogin'
import TDashboard from './Components/Teacher/TDashboard'
import THome from './Components/Teacher/THome'
import ViewChildren from './Components/Teacher/ViewChildren'
import TProfile from './Components/Teacher/TProfile'
import TeachingTips from './Components/Teacher/TeachingTips'
import CentreInfo from './Components/Teacher/CentreInfo'
import TNote from './Components/Teacher/TNote'
import EditTeacherProfile from './Components/Teacher/EditTeacherProfile'
import TChangePassword from './Components/Teacher/TChangePassword'
import TAnnouncement from './Components/Teacher/TAnnouncement'
import TCreateAnnounce from './Components/Teacher/TCreateAnnounce'
import AddTeachingTips from './Components/Teacher/AddTeachingTips'
import EditResource from './Components/Teacher/EditResource'
import TEditNote from './Components/Teacher/TEditNote'
import TAddNote from './Components/Teacher/TAddNote'
import ChildProfile from './Components/Teacher/ChildProfile'
import TDocument from './Components/Teacher/TDocument'
import TMealChart from './Components/Teacher/TMealChart'
import TMealDetail from './Components/Teacher/TMealDetail'
import TAddMeal from './Components/Teacher/TAddMeal'
import TSleepRecord from './Components/Teacher/TSleepRecord'
import TBottleChart from './Components/Teacher/TBottleChart'
import TAccidentReport from './Components/Teacher/TAccidentReport'
import TSunblockChart from './Components/Teacher/TSunblockChart'
import TAttendance from './Components/Teacher/TAttendance'




// Child components
import ChildLogin from './Components/Child/ChildLogin'
import CDashboard from './Components/Child/CDashboard'
import CHome from './Components/Child/CHome'
import ViewTeachers from './Components/Child/ViewTeachers'
import ChildMessage from './Components/Child/ChildMessage'
import CProfile from './Components/Child/CProfile'
import CDocuments from './Components/Child/CDocuments'
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
          <Route path='/dashboard/note/:adminId' element={<Note />}></Route>
          <Route path='/dashboard/add_teacher' element={<AddTeacher />}></Route>
          <Route path='/dashboard/add_child' element={<AddChild />}></Route>
          <Route path='/dashboard/centreintro' element={<CentreIntro />}></Route>
          <Route path='/dashboard/edit_profile/:id' element={<EditProfile />}></Route>
          <Route path='/dashboard/change_password/:id' element={<ChangePassword />}></Route>
          <Route path='/dashboard/edit_centreinfo/:id' element={<EditCentreinfo />}></Route>
          <Route path='/dashboard/add_centreinfo' element={<AddCentreInfo />}></Route>
          <Route path='/dashboard/add_note' element={<AddNote />}></Route>
          <Route path='/dashboard/edit_note/:adminId/:noteId' element={<EditNote />}></Route>
          <Route path='/dashboard/create_announcement' element={<CreateAnnouncement />}></Route>
          <Route path='/dashboard/manageteachers/:id' element={<TeacherDetail />}></Route>
          <Route path='/dashboard/edit_teacher/:id' element={<EditTeacher />}></Route>
          <Route path='/dashboard/managechildren/:id' element={<ChildDetail />}></Route>
          <Route path='/dashboard/edit_child/:id' element={<EditChild />}></Route>
        </Route>

        {/* Teacher portal */}
        <Route path='/teacher_login' element={<TeacherLogin />}></Route>
        <Route path='/teacher_dashboard' element={
          <PrivateRoute>
            <TDashboard />
          </PrivateRoute>
        }>
          <Route path='' element={<THome />}></Route>
          <Route path='/teacher_dashboard/children' element={<ViewChildren />}></Route>
          <Route path='/teacher_dashboard/children/:id' element={<ChildProfile />}></Route>
          <Route path='/teacher_dashboard/message' element={<Message />}></Route>
          <Route path='/teacher_dashboard/teacher_profile/:id' element={<TProfile />}></Route>
          <Route path='/teacher_dashboard/teaching_resource' element={<TeachingTips />}></Route>
          <Route path='/teacher_dashboard/centre_information' element={<CentreInfo />}></Route>
          <Route path='/teacher_dashboard/announcement' element={<TAnnouncement />}></Route>
          <Route path='/teacher_dashboard/note/:teacherId' element={<TNote />}></Route >
          <Route path='/teacher_dashboard/edit_profile/:id' element={<EditTeacherProfile />}></Route>
          <Route path='/teacher_dashboard/change_password/:id' element={<TChangePassword />}></Route>
          <Route path='/teacher_dashboard/create_announcement' element={<TCreateAnnounce />}></Route>
          <Route path='/teacher_dashboard/add_resource' element={<AddTeachingTips />}></Route>
          <Route path='/teacher_dashboard/edit_resource/:id' element={<EditResource />}></Route>
          <Route path='/teacher_dashboard/edit_note/:teacherId/:noteId' element={<TEditNote />}></Route>
          <Route path='/teacher_dashboard/add_note' element={<TAddNote />}></Route>
          <Route path='/teacher_dashboard/document' element={<TDocument />}></Route>
          <Route path='/teacher_dashboard/meal_chart' element={<TMealChart />}></Route>
          <Route path='/teacher_dashboard/sleep_record' element={<TSleepRecord />}></Route>
          <Route path='/teacher_dashboard/bottle_chart' element={<TBottleChart />}></Route>
          <Route path='/teacher_dashboard/accident_report' element={<TAccidentReport />}></Route>
          <Route path='/teacher_dashboard/sunblock_chart' element={<TSunblockChart />}></Route>
          <Route path='/teacher_dashboard/attendance' element={<TAttendance />}></Route>
          <Route path='/teacher_dashboard/meal_chart/:id' element={<TMealDetail />}></Route>
          <Route path='/teacher_dashboard/add_meal' element={<TAddMeal />}></Route>
        </Route>


        {/* Child portal */}
        <Route path='/child_login' element={<ChildLogin />}></Route>
        <Route path='/child_dashboard' element={<CDashboard />}>
          <Route path='' element={<CHome />}></Route>
          <Route path='/child_dashboard/view_teachers' element={<ViewTeachers />}></Route>
          <Route path='/child_dashboard/sendmessage' element={<ChildMessage />}></Route>
          <Route path='/child_dashboard/child_profile' element={<CProfile />}></Route>
          <Route path='/child_dashboard/document' element={<CDocuments />}></Route>
          <Route path='/child_dashboard/announcement' element={<Announce />}></Route>
          <Route path='/child_dashboard/centreinfo' element={<CentreInformation />}></Route>
          <Route path='/child_dashboard/resource' element={<Resource />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

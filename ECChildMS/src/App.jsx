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
import AMessage from './Components/Admin/AMessage'
import AMessageChild from './Components/Admin/AMessageChild'
import AMessageTeacher from './Components/Admin/AMessageTeacher'
import AMessageDetail from './Components/Admin/AMessageDetail'
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
import ADocument from './Components/Admin/ADocument'
import AAttendanceForm from './Components/Admin/AAttendanceForm'
import CreateAttendanceForm from './Components/Admin/CreateAttendanceForm'
import AAttendanceDetail from './Components/Admin/AAttendanceDetail'
import EditAttendanceForm from './Components/Admin/EditAttendanceForm'
import ASignIn from './Components/Admin/ASignIn'
import ASignOut from './Components/Admin/ASignOut'
import ALearningStory from './Components/Admin/ALearningStory'
import ALSDetail from './Components/Admin/ALSDetail'
import AChildLS from './Components/Admin/AChildLS'
import AMealChart from './Components/Admin/AMealChart'
import AMealDetail from './Components/Admin/AMealDetail'
import ASleepRecord from './Components/Admin/ASleepRecord'
import ASleepDetail from './Components/Admin/ASleepDetail'
import AFormulaChart from './Components/Admin/AFormulaChart'
import AFormulaDetail from './Components/Admin/AFormulaDetail'
import ASunblockChart from './Components/Admin/ASunblockChart'
import ASunblockDetail from './Components/Admin/ASunblockDetail'
import AAccidentReport from './Components/Admin/AAccidentReport'
import AAccidentDetail from './Components/Admin/AAccidentDetail'


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
import TEditMealDetail from './Components/Teacher/TEditMealDetail'
import TAddMeal from './Components/Teacher/TAddMeal'
import TSleepRecord from './Components/Teacher/TSleepRecord'
import TSleepDetail from './Components/Teacher/TSleepDetail'
import TCreateSleepChart from './Components/Teacher/TCreateSleepChart'
import TPutChildToSleep from './Components/Teacher/TPutChildToSleep'
import TEditSleepDetail from './Components/Teacher/TEditSleepDetail'
import TEditSleepChart from './Components/Teacher/TEditSleepChart'
import TFormulaChart from './Components/Teacher/TFormulaChart'
import TCreateFormulaChart from './Components/Teacher/TCreateFormulaChart'
import TEditFormulaChart from './Components/Teacher/TEditFormulaChart'
import TFormulaDetail from './Components/Teacher/TFormulaDetail'
import TFormulaFeedChild from './Components/Teacher/TFormulaFeedChild'
import TEditFormulaDetail from './Components/Teacher/TEditFormulaDetail'
import TMessage from './Components/Teacher/TMessage'
import TMessageDetail from './Components/Teacher/TMessageDetail'
import TMessageTeacher from './Components/Teacher/TMessageTeacher'
import TMessageChild from './Components/Teacher/TMessageChild'
import TMessageAdmin from './Components/Teacher/TMessageAdmin'
import TAccidentReport from './Components/Teacher/TAccidentReport'
import TAccidentDetail from './Components/Teacher/TAccidentDetail'
import TAddAccidentForm from './Components/Teacher/TAddAccidentForm'
import TEditAccidentForm from './Components/Teacher/TEditAccidentForm'
import TSunblockChart from './Components/Teacher/TSunblockChart'
import TCreateSunblockForm from './Components/Teacher/TCreateSunblockForm'
import TSunblockDetail from './Components/Teacher/TSunblockDetail'
import TEditSunblockDetail from './Components/Teacher/TEditSunblockDetail'
import TEditSunblockChart from './Components/Teacher/TEditSunblockChart'
import TApplySunblock from './Components/Teacher/TApplySunblock'
import TAttendance from './Components/Teacher/TAttendance'
import TEditMeal from './Components/Teacher/TEditMeal'
import AddChildToMeal from './Components/Teacher/AddChildToMeal'
import TAttendanceDetail from './Components/Teacher/TAttendanceDetail'
import TSignIn from './Components/Teacher/TSignIn'
import TSignOut from './Components/Teacher/TSignOut'
import TLearningStory from './Components/Teacher/TLearningStory'
import TLSStartNewMonth from './Components/Teacher/TLSStartNewMonth'
import TEditLS from './Components/Teacher/TEditLS'
import TLSDetail from './Components/Teacher/TLSDetail'
import TWriteLS from './Components/Teacher/TWriteLS'
import TChildLS from './Components/Teacher/TChildLS'
import TEditLSDetail from './Components/Teacher/TEditLSDetail'


// Child components
import ChildLogin from './Components/Child/ChildLogin'
import CDashboard from './Components/Child/CDashboard'
import CHome from './Components/Child/CHome'
import ViewTeachers from './Components/Child/ViewTeachers'
import ChildMessage from './Components/Child/ChildMessage'
import CProfile from './Components/Child/CProfile'
import CDocuments from './Components/Child/CDocuments'
import CAnnouncement from './Components/Child/CAnnouncement'
import Resource from './Components/Child/Resource'
import CTeacherProfile from './Components/Child/CTeacherProfile'
import CEditProfile from './Components/Child/CEditProfile'
import CCentreInfo from './Components/Child/CCentreInfo'
import CChangePassword from './Components/Child/CChangePassword'
import CMealChart from './Components/Child/CMealChart'
import CSleepRecord from './Components/Child/CSleepRecord'
import CBottleChart from './Components/Child/CBottleChart'
import CAccidentForm from './Components/Child/CAccidentForm'
import CSunblockChart from './Components/Child/CSunblockChart'
import CAttendance from './Components/Child/CAttendance'
import CAccidentDetail from './Components/Child/CAccidentDetail'
import CMealDetail from './Components/Child/CMealDetail'
import CLearningStory from './Components/Child/CLearningStory'
import CMessageAdmin from './Components/Child/CMessageAdmin'
import CMessageTeacher from './Components/Child/CMessageTeacher'
import CMessageDetail from './Components/Child/CMessageDetail'
import CLearningStoryDetail from './Components/Child/CLearningStoryDetail'
import CSignIn from './Components/Child/CSignIn'
import CSignOut from './Components/Child/CSignOut'



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
          <Route path='/dashboard/message/:id' element={<AMessage />}></Route>
          <Route path='/dashboard/message_a_child' element={<AMessageChild />}></Route>
          <Route path='/dashboard/message_a_teacher' element={<AMessageTeacher />}></Route>
          <Route path='/dashboard/message_detail/:id' element={<AMessageDetail />}></Route>
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
          <Route path='/dashboard/document' element={<ADocument />}></Route>
          <Route path='/dashboard/attendance' element={<AAttendanceForm />}></Route>
          <Route path='/dashboard/add_attendance' element={<CreateAttendanceForm />}></Route>
          <Route path='/dashboard/edit_attendance/:id' element={<EditAttendanceForm />}></Route>
          <Route path='/dashboard/attendance_detail/:id' element={<AAttendanceDetail />}></Route>
          <Route path='/dashboard/attendance/:id/sign_in' element={<ASignIn />}></Route>
          <Route path='/dashboard/attendance/:id/sign_out' element={<ASignOut />}></Route>
          <Route path='/dashboard/learning_story' element={<ALearningStory />}></Route>
          <Route path='/dashboard/learning_story_detail/:id' element={<ALSDetail />}></Route>
          <Route path='/dashboard/child_ls/:id' element={<AChildLS />}></Route>
          <Route path='/dashboard/meal_chart' element={<AMealChart />}></Route>
          <Route path='/dashboard/meal_detail/:id' element={<AMealDetail />}></Route>
          <Route path='/dashboard/sleep_record' element={<ASleepRecord />}></Route>
          <Route path='/dashboard/sleep_detail/:id' element={<ASleepDetail />}></Route>
          <Route path='/dashboard/formula_chart' element={<AFormulaChart />}></Route>
          <Route path='/dashboard/formula_detail/:id' element={<AFormulaDetail />}></Route>
          <Route path='/dashboard/sunblock_chart' element={<ASunblockChart />}></Route>
          <Route path='/dashboard/sunblock_chart_detail/:id' element={<ASunblockDetail />}></Route>
          <Route path='/dashboard/accident_form' element={<AAccidentReport />}></Route>
          <Route path='/dashboard/accident_form/:id' element={<AAccidentDetail />}></Route>
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
          <Route path='/teacher_dashboard/message/:id' element={<TMessage />}></Route>
          <Route path='/teacher_dashboard/message_detail/:id' element={<TMessageDetail />}></Route>
          <Route path='/teacher_dashboard/message_a_teacher' element={<TMessageTeacher />}></Route>
          <Route path='/teacher_dashboard/message_a_child' element={<TMessageChild />}></Route>
          <Route path='/teacher_dashboard/message_admin' element={<TMessageAdmin />}></Route>
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
          <Route path='/teacher_dashboard/edit_meal_detail/:id' element={<TEditMealDetail />}></Route>
          <Route path='/teacher_dashboard/sleep_record' element={<TSleepRecord />}></Route>
          <Route path='/teacher_dashboard/create_sleep_chart' element={<TCreateSleepChart />}></Route>
          <Route path='/teacher_dashboard/sleep_detail/:id' element={<TSleepDetail />}></Route>
          <Route path='/teacher_dashboard/sleep_record/:id/put_child_to_sleep' element={<TPutChildToSleep />}></Route>
          <Route path='/teacher_dashboard/edit_sleep_detail/:id' element={<TEditSleepDetail />}></Route>
          <Route path='/teacher_dashboard/edit_sleep_chart/:id' element={<TEditSleepChart />}></Route>
          <Route path='/teacher_dashboard/formula_chart' element={<TFormulaChart />}></Route>
          <Route path='/teacher_dashboard/formula_detail/:id' element={<TFormulaDetail />}></Route>
          <Route path='/teacher_dashboard/create_formula_chart' element={<TCreateFormulaChart />}></Route>
          <Route path='/teacher_dashboard/edit_formula_chart/:id' element={<TEditFormulaChart />}></Route>
          <Route path='/teacher_dashboard/formula_chart/:id/feed_a_child' element={<TFormulaFeedChild />}></Route>
          <Route path='/teacher_dashboard/edit_formula_detail/:id' element={<TEditFormulaDetail />}></Route>
          <Route path='/teacher_dashboard/accident_form' element={<TAccidentReport />}></Route>
          <Route path='/teacher_dashboard/accident_form/:id' element={<TAccidentDetail />}></Route>
          <Route path='/teacher_dashboard/add_accident_form' element={<TAddAccidentForm />}></Route>
          <Route path='/teacher_dashboard/edit_accident_form/:id' element={<TEditAccidentForm />}></Route>
          <Route path='/teacher_dashboard/sunblock_chart' element={<TSunblockChart />}></Route>
          <Route path='/teacher_dashboard/add_sunblock_chart' element={<TCreateSunblockForm />}></Route>
          <Route path='/teacher_dashboard/edit_sunblock_chart/:id' element={<TEditSunblockChart />}></Route>
          <Route path='/teacher_dashboard/sunblock_chart_detail/:id' element={<TSunblockDetail />}></Route>
          <Route path='/teacher_dashboard/sunblock_chart/:id/apply_sunblock_to_child' element={<TApplySunblock />}></Route >
          <Route path='/teacher_dashboard/edit_sunblock_detail/:id' element={<TEditSunblockDetail />}></Route>
          <Route path='/teacher_dashboard/attendance' element={<TAttendance />}></Route>
          <Route path='/teacher_dashboard/attendance_detail/:id' element={<TAttendanceDetail />}></Route>
          <Route path='/teacher_dashboard/attendance/:id/sign_in' element={<TSignIn />}></Route>
          <Route path='/teacher_dashboard/attendance/:id/sign_out' element={<TSignOut />}></Route>
          <Route path='/teacher_dashboard/add_meal' element={<TAddMeal />}></Route>
          <Route path='/teacher_dashboard/meal_detail/:id' element={<TMealDetail />}></Route>
          <Route path='/teacher_dashboard/edit_meal/:id' element={<TEditMeal />}></Route>
          <Route path='/teacher_dashboard/meal_chart/:id/add_childMeal' element={<AddChildToMeal />}></Route>
          <Route path='/teacher_dashboard/learning_story' element={<TLearningStory />}></Route>
          <Route path='/teacher_dashboard/start_new_month' element={<TLSStartNewMonth />}></Route>
          <Route path='/teacher_dashboard/edit_ls/:id' element={<TEditLS />}></Route>
          <Route path='/teacher_dashboard/learning_story_detail/:id' element={<TLSDetail />}></Route>
          <Route path='/teacher_dashboard/learning_story/:id/write_a_learning_story' element={<TWriteLS />}></Route>
          <Route path='/teacher_dashboard/child_ls/:id' element={<TChildLS />}></Route>
          <Route path='/teacher_dashboard/edit_ls_detail/:id' element={<TEditLSDetail />}></Route >
        </Route>


        {/* Child portal */}
        <Route path='/child_login' element={<ChildLogin />}></Route>
        <Route path='/child_dashboard' element={
          <PrivateRoute>
            <CDashboard />
          </PrivateRoute>}>
          <Route path='' element={<CHome />}></Route>
          <Route path='/child_dashboard/teachers' element={<ViewTeachers />}></Route>
          <Route path='/child_dashboard/teacher/:id' element={<CTeacherProfile />}></Route>
          <Route path='/child_dashboard/message/:id' element={<ChildMessage />}></Route>
          <Route path='/child_dashboard/message_admin' element={<CMessageAdmin />}></Route>
          <Route path='/child_dashboard/message_a_teacher' element={<CMessageTeacher />}></Route>
          <Route path='/child_dashboard/message_detail/:id' element={<CMessageDetail />}></Route>
          <Route path='/child_dashboard/profile/:id' element={<CProfile />}></Route>
          <Route path='/child_dashboard/edit_profile/:id' element={<CEditProfile />}></Route>
          <Route path='/child_dashboard/documents' element={<CDocuments />}></Route>
          <Route path='/child_dashboard/announcement' element={<CAnnouncement />}></Route>
          <Route path='/child_dashboard/resource' element={<Resource />}></Route>
          <Route path='/child_dashboard/centreinfo' element={<CCentreInfo />}></Route>
          <Route path='/child_dashboard/change_password/:id' element={<CChangePassword />}></Route>
          <Route path='/child_dashboard/meal_chart' element={<CMealChart />}></Route>
          <Route path='/child_dashboard/meal_detail/:id/:childId' element={<CMealDetail />}></Route>
          <Route path='/child_dashboard/sleep_record/:id' element={<CSleepRecord />}></Route>
          <Route path='/child_dashboard/bottle_chart/:id' element={<CBottleChart />}></Route>
          <Route path='/child_dashboard/accident_form/:childId' element={<CAccidentForm />}></Route>
          <Route path='/child_dashboard/accident_detail/:id' element={<CAccidentDetail />}></Route>
          <Route path='/child_dashboard/sunblock_chart/:id' element={<CSunblockChart />}></Route>
          <Route path='/child_dashboard/attendance/:id' element={<CAttendance />}></Route>
          <Route path='/child_dashboard/attendance/:id/sign_in' element={<CSignIn />}></Route>
          <Route path='/child_dashboard/attendance/:id/sign_out' element={<CSignOut />}></Route>
          <Route path='/child_dashboard/learning_story/:id' element={<CLearningStory />}></Route>
          <Route path='/child_dashboard/ls_detail/:id' element={<CLearningStoryDetail />}></Route>
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import TDashboard from './TDashboard.jsx'
import THome from './THome.jsx'
import ViewChildren from './ViewChildren.jsx'
import Message from './Message.jsx'
import TProfile from './TProfile.jsx'
import TeachingTips from './TeachingTips.jsx'
import CentreInfo from './CentreInfo.jsx'
import GroupAnnon from './GroupAnnon.jsx'
import TodoList from './TodoList.jsx'
import TeacherLogin from './TeacherLogin.jsx'

const TeacherPortal = () => {
    return (
        <Routes>
            <Route path='/teacher_login' element={<TeacherLogin />}></Route>
            <Route path='/teacher_dashboard' element={<TDashboard />}>
                <Route path='' element={<THome />}></Route>
                <Route path='/teacher_dashboard/view_children' element={<ViewChildren />}></Route>
                <Route path='/teacher_dashboard/message' element={<Message />}></Route>
                <Route path='/teacher_dashboard/teacher_profile' element={<TProfile />}></Route>
                <Route path='/teacher_dashboard/teaching_tips' element={<TeachingTips />}></Route>
                <Route path='/teacher_dashboard/centre_information' element={<CentreInfo />}></Route>
                <Route path='/teacher_dashboard/group_announcement' element={<GroupAnnon />}></Route>
                <Route path='/teacher_dashboard/to_do_list' element={<TodoList />}></Route>
            </Route>
        </Routes>
    )
}

export default TeacherPortal
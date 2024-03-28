import Login from '../Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CDashboard from './CDashboard.jsx'
import CHome from './CHome.jsx'
import ViewTeachers from './ViewTeachers.jsx'
import ChildMessage from './ChildMessage.jsx'
import CProfile from './CProfile.jsx'
import Documents from './Documents.jsx'

const ChildPortal = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/child_dashboard' element={<CDashboard />}>
                    <Route path='' element={<CHome />}></Route>
                    <Route path='/child_dashboard/view_teachers' element={<ViewTeachers />}></Route>
                    <Route path='/child_dashboard/sendamessage' element={<ChildMessage />}></Route>
                    <Route path='/child_dashboard/child_profile' element={<CProfile />}></Route>
                    <Route path='/child_dashboard/documents' element={<Documents />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default ChildPortal
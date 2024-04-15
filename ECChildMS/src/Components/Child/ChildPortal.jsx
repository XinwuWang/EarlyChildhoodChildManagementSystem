import { Route, Routes } from 'react-router-dom'
import CDashboard from './CDashboard.jsx'
import CHome from './CHome'
import ViewTeachers from './ViewTeachers'
import ChildMessage from './ChildMessage'
import CProfile from './CProfile'
import Documents from './Documents'
import Announce from './Announce.jsx'
import CentreInformation from './CentreInformation.jsx'
import Resource from './Resource.jsx'
import ChildLogin from './ChildLogin.jsx'

const ChildPortal = () => {
    return (
        <Routes>
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

    )
}

export default ChildPortal
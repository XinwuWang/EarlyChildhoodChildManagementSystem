import { Link, Outlet } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CDashboard = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    const handleLogout = () => {
        axios.get('http://localhost:3000/child/logout')
            .then(result => {
                if (result.data.Status) {
                    // Remove the data stored in the local storage
                    localStorage.removeItem('valid')
                    navigate('/')
                    window.location.reload();
                }
            })
    }

    const childId = localStorage.getItem('childId');


    return (
        <div className='container-fluid'>
            <div className='row flex-nowrap'>
                <div className='col-auto col-md-4 col-xl-2 px-sm-2 px-0 bg-dark'>
                    <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                        <Link to='/child_dashboard'
                            className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'
                        >
                            <span className='fs-5 fw-bolder d-none d-sm-inline'>
                                Kia Ora! Welcome!
                            </span>
                        </Link>
                        <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
                            id='menu'>
                            <li className='w-100'>
                                <Link to='/child_dashboard'
                                    className='nav-link text-white px-0 align-middle'
                                >
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to='/child_dashboard/teachers'
                                    className='nav-link px-0 align-middle text-white'
                                >
                                    <i className="fs-4 bi-people ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                        View teachers
                                    </span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to='/child_dashboard/documents'
                                    className='nav-link px-0 align-middle text-white'
                                >
                                    <i className="fs-4 bi-info-circle ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                        Documents
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to='/child_dashboard/sendmessage'
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-envelope-at ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Send Message</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to='/child_dashboard/child_profile'
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-person-circle ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Profile</span>
                                </Link>
                            </li>
                            <li className="w-100" onClick={handleLogout}>
                                <Link to='/'
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-power ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col p-0 m-0'>
                    <div className='p-2 d-flex justify-content-center shadow'>
                        <h4>Early Childhood Management System - Child</h4>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default CDashboard
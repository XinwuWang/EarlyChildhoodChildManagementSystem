import { Link, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'


const Dashboard = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
            .then(result => {
                if (result.data.Status) {
                    // Remove the data stored in the local storage
                    localStorage.removeItem('valid')
                    navigate('/')
                    window.location.reload();
                }
            })
    }

    const adminId = localStorage.getItem('adminId');
    const adminName = localStorage.getItem('adminName');

    return (
        <div className='container-fluid'>
            <div className='row flex-nowrap'>
                <div className='col-auto col-md-4 col-xl-2 px-sm-2 px-0 bg-dark'>
                    <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                        <Link to='/dashboard'
                            className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'
                        >
                            <span className='fs-5 fw-bolder d-none d-sm-inline'>
                                Kia Ora, {adminName}!
                            </span>
                        </Link>
                        <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
                            id='menu'>
                            <li className='w-100'>
                                <Link to='/dashboard'
                                    className='nav-link text-white px-0 align-middle'
                                >
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to='/dashboard/manageteachers'
                                    className='nav-link px-0 align-middle text-white'
                                >
                                    <i className="fs-4 bi-people ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                        Manage Teachers
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to='/dashboard/managechildren'
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-person-video2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Manage Children</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to='/dashboard/document'
                                    className='nav-link px-0 align-middle text-white'
                                >
                                    <i className="fs-4 bi-file-earmark-text ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                        Document
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to={`/dashboard/message/${adminId}`}
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-envelope-at ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Message</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to={`/dashboard/profile/${adminId}`}
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-person-circle ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Profile</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to='/dashboard/centreintro'
                                    className='nav-link px-0 align-middle text-white'
                                >
                                    <i className="fs-4 bi-info-circle ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                        Centre Infomation
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to='/dashboard/teaching_resource'
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-book-half ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Teaching Resources</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to='/dashboard/announcement'
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-megaphone ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Announcement</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to={'/dashboard/note/' + adminId}
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-list-ul ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Note</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to={'/dashboard/change_password/' + adminId}
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-key ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Change Password</span>
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
                        <h4>Admin Portal - {adminName}</h4>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
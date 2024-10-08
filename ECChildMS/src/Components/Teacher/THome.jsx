import { Link } from 'react-router-dom'

const THome = () => {
    const teacherId = localStorage.getItem('teacherId');

    return (
        <div>
            <div className="container my-5">
                <div className="p-5 text-center bg-body-tertiary rounded-3">
                    <h1 className="text-body-emphasis">Hello!</h1>
                    <p className="lead">
                        Welcome to the teacher portal of Early Childhood Child Management System
                    </p>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>View Children</h2>
                        <p>View details of all children</p>
                        <Link to='/teacher_dashboard/children' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Message</h2>
                        <p>Send a message to another teacher, child, or admin</p>
                        <Link to={'/teacher_dashboard/message/' + teacherId} className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Teaching Resources</h2>
                        <p>A list of useful teaching resources</p>
                        <Link to='/teacher_dashboard/teaching_resource' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Profile</h2>
                        <p>Your personal details</p>
                        <Link to={'/teacher_dashboard/teacher_profile/' + teacherId} className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Announcement</h2>
                        <p>Centre wide group announcement</p>
                        <Link to='/teacher_dashboard/announcement' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Centre Information</h2>
                        <p>Necessary information of our centre</p>
                        <Link to='/teacher_dashboard/centre_information' className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>

            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Notebook</h2>
                        <p>Record your important notes</p>
                        <Link to={'/teacher_dashboard/note/' + teacherId} className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Document</h2>
                        <p>Documents of enrolled children</p>
                        <Link to='/teacher_dashboard/document' className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>View Teachers</h2>
                        <p>View details of all teachers</p>
                        <Link to={'/teacher_dashboard/teachers'} className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Change Password</h2>
                        <p>Update your password</p>
                        <Link to={'/teacher_dashboard/change_password/' + teacherId} className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default THome
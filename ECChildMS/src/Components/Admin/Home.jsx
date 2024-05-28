import { Link } from 'react-router-dom'

const Home = () => {
    const adminId = localStorage.getItem('adminId');

    return (
        <div>
            <div className="container my-5">
                <div className="p-5 text-center bg-body-tertiary rounded-3">
                    <h1 className="text-body-emphasis">Hello!</h1>
                    <p className="lead">
                        Welcome to the admin portal of Early Childhood Child Management System
                    </p>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Manage Teachers</h2>
                        <p>View & edit teachers&apos; informtion</p>
                        <Link to='/dashboard/manageteachers' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Manager Children</h2>
                        <p>View & edit children&apos;s information</p>
                        <Link to='/dashboard/managechildren' className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Message</h2>
                        <p>Send a message to a teacher or a child</p>
                        <Link to={`/dashboard/message/${adminId}`} className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Profile</h2>
                        <p>Your personal details</p>
                        <Link to={'/dashboard/profile/' + adminId} className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Teaching Resources</h2>
                        <p>Useful teaching resources</p>
                        <Link to='/dashboard/teaching_resource' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Centre Information</h2>
                        <p>Necessary information of our centre</p>
                        <Link to='/dashboard/centreintro' className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Group Announcement</h2>
                        <p>Centre wide group news</p>
                        <Link to='/dashboard/announcement' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Note</h2>
                        <p>Take a quick note</p>
                        <Link to='/dashboard/note' className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
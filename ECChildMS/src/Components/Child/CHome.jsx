import { Link } from 'react-router-dom'


const CHome = () => {
    const childId = localStorage.getItem('childId');

    return (
        <div>
            <div className="container my-5">
                <div className="p-5 text-center bg-body-tertiary rounded-3">
                    <h1 className="text-body-emphasis">Hello!</h1>
                    <p className="lead">
                        Hi, welcome to the child portal!
                    </p>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>View Teachers</h2>
                        <p>View teachers&apos; informtion</p>
                        <Link to='/child_dashboard/teachers' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Documents</h2>
                        <p>View all documents</p>
                        <Link to='/child_dashboard/documents' className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Message</h2>
                        <p>Send a message to a teacher or admin</p>
                        <Link to={`/child_dashboard/message/${childId}`} className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Profile</h2>
                        <p>Your personal details</p>
                        <Link to={'/child_dashboard/profile/' + childId} className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Learning Resources</h2>
                        <p>Useful resources for learning and growth</p>
                        <Link to='/child_dashboard/resource' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>About Centre</h2>
                        <p>Information of our centre</p>
                        <Link to='/child_dashboard/centreinfo' className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Announcement</h2>
                        <p>Centre wide group news</p>
                        <Link to='/child_dashboard/announcement' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Change Password</h2>
                        <p>Update your password</p>
                        <Link to={`/child_dashboard/change_password/${childId}`} className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CHome
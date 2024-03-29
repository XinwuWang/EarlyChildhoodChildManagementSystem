import { Link } from 'react-router-dom'


const CHome = () => {
    return (
        <div>
            <div className="container my-5">
                <div className="p-5 text-center bg-body-tertiary rounded-3">
                    <h1 className="text-body-emphasis">Kia ora! Hello!</h1>
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
                        <Link to='/child_dashboard/view_teachers' className='btn btn-outline-light'>More</Link>
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
                        <h2>Send Message</h2>
                        <p>Shortcut to send an email to the admin or a teacher</p>
                        <Link to='/child_dashboard/sendmessage' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Profile</h2>
                        <p>Your personal details</p>
                        <Link to='/child_dashboard/child_profile' className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Teaching Resources</h2>
                        <p>Useful teaching resources</p>
                        <Link to='/child_dashboard/resource' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                        <h2>Centre Information</h2>
                        <p>Necessary information of our centre</p>
                        <Link to='/child_dashboard/centreinfo' className='btn btn-outline-dark'>More</Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-md-stretch m-1">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>Group Announcement</h2>
                        <p>Centre wide group news</p>
                        <Link to='/child_dashboard/announcement' className='btn btn-outline-light'>More</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CHome
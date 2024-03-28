import { Link } from 'react-router-dom'

const Teachers = () => {
    return (
        <div className='px-5 mt-5'>
            <div className='d-flex justify-content-center'>
                <h3>Teacher List</h3>
            </div>
            <div className="row pt-5  align-items-center">
                <div className="col-lg-4">
                    <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                    <h2 className="fw-normal">Teacher 1</h2>
                    <p><a className="btn btn-secondary" href="#">View details »</a></p>
                </div>
                <div className="col-lg-4">
                    <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                    <h2 className="fw-normal">Teacher 2</h2>
                    <p><a className="btn btn-secondary" href="#">View details »</a></p>
                </div>
                <div className="col-lg-4">
                    <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                    <h2 className="fw-normal">Teacher 3</h2>
                    <p><a className="btn btn-secondary" href="#">View details »</a></p>
                </div>
            </div>
            <div className="container pt-5">
                <div className="row">
                    <div className="col text-center">
                        <Link to='/dashboard/add_teacher' className='btn btn-success'>Add Teacher</Link>
                    </div>
                </div>
            </div>
            <div className='mt-3'></div>
        </div>
    )
}

export default Teachers
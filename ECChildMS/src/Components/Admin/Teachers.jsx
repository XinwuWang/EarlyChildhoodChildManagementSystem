import { Link } from 'react-router-dom'

const Teachers = () => {
    return (
        <div className='px-5 mt-5'>
            <div className='d-flex justify-content-center'>
                <h3>Teahcer List</h3>
            </div>
            <Link to='/dashboard/add_teacher' className='btn btn-success'>Add Teacher</Link>
            <div className='mt-3'></div>
        </div>
    )
}

export default Teachers
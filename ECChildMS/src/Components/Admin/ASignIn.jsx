import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'


const ASignIn = () => {
    const { id } = useParams()
    const adminId = localStorage.getItem('adminId');

    const [attendance, setAttendance] = useState({
        attendance_date: id,
        child_id: '',
        time_in: '',
        admin_signature: adminId
    });
    const navigate = useNavigate()


    const [child, setChild] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/managechildren')
            .then(result => {
                if (result.data.Status) {
                    console.log(result.data.Result)
                    setChild(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { attendance_date, child_id, time_in, admin_signature } = attendance;

        if (!child_id || !time_in) {
            return alert('Please select a child and enter the time in');
        }

        const data = { attendance_date, child_id, time_in, admin_signature };

        axios.post('http://localhost:3000/auth/check_sign_in', { child_id, attendance_date })
            .then(result => {
                if (result.data.Status) {
                    window.confirm('This child has already signed in today.');
                } else {
                    axios.post('http://localhost:3000/auth/sign_in', data)
                        .then(result => {
                            if (result.data.Status) {
                                navigate(`/dashboard/attendance_detail/${id}`);
                            } else {
                                alert(result.data.Error || 'Error adding information');
                            }
                        })
                        .catch(err => {
                            console.error('Error:', err);
                            alert('An error occurred while processing your request');
                        });
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('An error occurred while checking sign in status');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttendance(prevAttendance => ({ ...prevAttendance, [name]: value }));
    };


    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Sign In</h3>
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Child</strong>
                        </label>
                        <select
                            name='child_id'
                            id='child_id'
                            className='form-select'
                            value={attendance.child_id}
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Select Child</option>
                            {child.map(c => (
                                <option value={c.id} key={c.id}>{c.id} {c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='time_in' className='form-label'><strong>Time In</strong></label>
                        <input
                            type='time'
                            name='time_in'
                            id='time_in'
                            className='form-control rounded-0'
                            value={attendance.time_in}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/dashboard/attendance_detail/' + id} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ASignIn
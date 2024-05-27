import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'


const CSignIn = () => {
    const { id } = useParams()
    // const childId = localStorage.getItem('childId');
    const [attendance, setAttendance] = useState({
        attendance_date: '',
        child_id: id,
        time_in: '',
        parent_signature: id
    });
    const navigate = useNavigate()


    const [attendanceDate, setAttendanceDate] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/child/attendance_date')
            .then(result => {
                if (result.data.Status) {
                    console.log(result.data.Result)
                    setAttendanceDate(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { attendance_date, child_id, time_in, parent_signature } = attendance;



        const data = { attendance_date, child_id, time_in, parent_signature };

        axios.post('http://localhost:3000/child/check_sign_in', { child_id, attendance_date })
            .then(result => {
                if (result.data.Status) {
                    window.confirm('You have already signed in today.');
                } else {
                    axios.post('http://localhost:3000/child/sign_in', data)
                        .then(result => {
                            if (result.data.Status) {
                                navigate(`/child_dashboard/attendance/${id}`);
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
                        <label htmlFor='attendance_date' className='form-label'>
                            <strong>Date</strong>
                        </label>

                        <select

                            name='attendance_date'
                            id='attendance_date'
                            className='form-select'
                            value={attendance.attendance_date}
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Select a date</option>
                            {attendanceDate.map(c => (
                                <option value={c.id} key={c.id}> {c.form_date}</option>
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
                        <Link to={'/child_dashboard/attendance/' + id} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default CSignIn
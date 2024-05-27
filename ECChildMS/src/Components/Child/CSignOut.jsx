import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'


const CSignOut = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [attendance, setAttendance] = useState({
        attendance_date: '',
        child_id: id,
        time_out: '',
        parent_signature: id
    });

    const [attendanceDate, setAttendanceDate] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/child/attendance_date')
            .then(result => {
                if (result.data.Status) {
                    setAttendanceDate(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.error('Error fetching attendance date data:', err);
                alert('Failed to fetch attendance date data');
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const { attendance_date, child_id, time_out, parent_signature } = attendance;

        if (!child_id || !time_out) {
            return alert('Please enter the time out');
        }

        const data = { attendance_date, child_id, time_out, parent_signature };

        axios.post('http://localhost:3000/child/check_sign_in', { child_id, attendance_date })
            .then(result => {
                if (result.data.Status) {
                    axios.post('http://localhost:3000/child/check_sign_out', { child_id, attendance_date })
                        .then(result => {
                            if (result.data.Status) {
                                window.confirm('You have already signed out today.');
                            } else {
                                axios.post('http://localhost:3000/child/sign_out', data)
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
                } else {
                    window.confirm('You have not signed in yet today.');
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('An error occurred');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttendance(prevAttendance => ({ ...prevAttendance, [name]: value }));
    };

    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Sign Out</h3>
                <hr />
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='attendance_date' className='form-label'><strong>Date</strong></label>
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
                                <option value={c.id} key={c.id}>{c.form_date}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='time_out' className='form-label'><strong>Time Out</strong></label>
                        <input
                            type='time'
                            name='time_out'
                            id='time_out'
                            className='form-control rounded-0'
                            value={attendance.time_out}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={`/child_dashboard/attendance/${id}`} className='btn btn-light w-100'>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CSignOut
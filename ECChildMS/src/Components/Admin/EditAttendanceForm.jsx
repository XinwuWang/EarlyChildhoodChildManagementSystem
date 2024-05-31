import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditAttendanceForm = () => {
    const { id } = useParams()
    const [attendance, setAttendance] = useState({
        form_date: '',
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/attendance/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setAttendance({
                        ...attendance,
                        form_date: result.data.Result[0].form_date,
                    })
                } else {
                    throw new Error(result.data.Error || 'Information data not found');
                }
            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch data');
            }).finally(() => {
                setLoading(false)
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()


        const Data = {
            form_date: attendance.form_date
        }

        axios.put(`http://localhost:3000/auth/edit_attendance/${id}`, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/attendance')
                    setTimeout(() => {
                        alert('Attendance form updated successfully');
                    }, 300);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }



    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Edit Attendance Form</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='attendance_date' className='form-label'>Date</label>
                        <input
                            type='date'
                            name='attendance_date'
                            id='attendance_date'
                            placeholder='Choose a date'
                            className='form-control rounded-0'
                            value={attendance.form_date}
                            onChange={(e) => setAttendance({ ...attendance, form_date: e.target.value })}
                            required />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/dashboard/attendance'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default EditAttendanceForm
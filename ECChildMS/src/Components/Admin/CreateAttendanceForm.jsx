import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const CreateAttendanceForm = () => {
    const adminId = localStorage.getItem('adminId');
    const adminName = localStorage.getItem('adminName');
    const [attendance, setAttendance] = useState({
        form_date: '',
        person_who_created: adminId,
    });
    const navigate = useNavigate()





    const handleSubmit = (e) => {
        e.preventDefault()

        const Data = {
            form_date: attendance.form_date,
            person_who_created: attendance.person_who_created
        }




        axios.post('http://localhost:3000/auth/add_attendance', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/attendance')
                } else {
                    console.log(result.data)
                    alert(result.data.Error || 'Error adding information')
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('An error occurred while processing your request');
            });
    }



    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Add a Attendance Form</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='date' className='form-label'><strong>Date</strong></label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            placeholder='Choose a date'
                            className='form-control rounded-0'
                            onChange={(e) => setAttendance({ ...attendance, form_date: e.target.value })}
                            required />
                    </div>
                    <div>
                        <label htmlFor='person_who_created' className='form-label'><strong>Person who created</strong></label>
                        <input
                            type='text'
                            name='person_who_created'
                            id='person_who_created'
                            value={adminName}
                            className='form-control rounded-0'
                            disabled />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/dashboard/attendance'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )

}

export default CreateAttendanceForm
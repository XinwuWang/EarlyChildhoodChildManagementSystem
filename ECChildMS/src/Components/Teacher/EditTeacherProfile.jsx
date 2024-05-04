import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const EditTeacherProfile = () => {
    const teacherId = localStorage.getItem('teacherId');
    const [teacher, setTeacher] = useState({
        name: '',
        teaching_No: '',
        date_of_birth: '',
        phone: '',
        address: '',
        teaching_philosophy: '',
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/teacher_profile/${teacherId}`)
            .then(result => {
                console.log(result.data)
                setTeacher(result.data[0])

            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch teacher data');
            }).finally(() => {
                setLoading(false)
            });
    }, [teacherId])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/teacher/edit_profile/' + teacherId, teacher)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/teacher_profile/' + teacherId)
                    setTimeout(() => {
                        alert('Your profile updated successfully');
                    }, 300);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    // Render loading state while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>

                <form className='row g-1' onSubmit={handleSubmit}>
                    <h3 className='text-center'>Edit {teacher.name}&#39;s Profile</h3>
                    <div className='col-12'>
                        <label htmlFor='FullName' className='form-label'><strong>Name</strong></label>
                        <input type='text' name='FullName' id='FullName' placeholder='Enter name' value={teacher.name}
                            className='form-control rounded-0' onChange={(e) => setTeacher({ ...teacher, name: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='teaching_No' className='form-label'>
                            <strong>Teaching Registration Number</strong>
                        </label>
                        <input type='number' id='teaching_No' placeholder='Enter teaching registration number' value={teacher.teaching_No} className='form-control rounded-0' onChange={(e) => setTeacher({ ...teacher, teaching_No: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputEmail' className='form-label'>
                            <strong>Email</strong>
                        </label>
                        <input type='emaill' name='inputEmail' id='inputEmail' placeholder='Enter email' value={teacher.email} className='form-control rounded-0' autoComplete='off' disabled />
                    </div>

                    <div className='col-12'>
                        <label htmlFor='date_of_birth' className='form-label'>
                            <strong>Date of Birth</strong>
                        </label>
                        <input type='date' id='date_of_birth' placeholder='Choose date of birth' value={teacher.date_of_birth} className='form-control rounded-0' onChange={(e) => setTeacher({ ...teacher, date_of_birth: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='phoneNumber' className='form-label'>
                            <strong>Phone</strong>
                        </label>
                        <input type='number' id='phoneNumber' placeholder='Enter phone number' value={teacher.phone} className='form-control rounded-0' onChange={(e) => setTeacher({ ...teacher, phone: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address' className='form-label'>
                            <strong>Address</strong>
                        </label>
                        <input type='text' id='address' placeholder='Enter home address' value={teacher.address} className='form-control rounded-0' onChange={(e) => setTeacher({ ...teacher, address: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='start_date' className='form-label'>
                            <strong>Start Date</strong>
                        </label>
                        <input type='date' id='start_date' placeholder='Choose start date' value={teacher.start_date} className='form-control rounded-0' disabled />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='teaching_phi' className='form-label'>
                            <strong>Teaching Philosophy</strong>
                        </label>
                        <input type='text' id='teaching_phi' placeholder='Enter teaching philosophy' value={teacher.teaching_philosophy} className='form-control rounded-0' onChange={(e) => setTeacher({ ...teacher, teaching_philosophy: e.target.value })} required />
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="d-flex justify-content-center">
                            <button className='btn btn-success me-2' type='submit'>Save</button>
                            <Link to={'/teacher_dashboard/teacher_profile/' + teacherId} className="btn btn-secondary">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default EditTeacherProfile
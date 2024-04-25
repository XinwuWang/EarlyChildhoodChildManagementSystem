import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'



const AddTeacher = () => {
    const [teacher, setTeacher] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        teaching_number: '',
        date_of_birth: '',
        address: '',
        teaching_philosophy: '',
        profileImage: '',
        start_date: ''
    });
    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(teacher);
        const formData = new FormData();
        formData.append('name', teacher.name);
        formData.append('email', teacher.email);
        formData.append('password', teacher.password);
        formData.append('phone', teacher.phone);
        formData.append('teaching_number', teacher.teaching_number);
        formData.append('date_of_birth', teacher.date_of_birth);
        formData.append('address', teacher.address);
        formData.append('teaching_philosophy', teacher.teaching_philosophy);
        formData.append('image', teacher.profileImage);
        formData.append('start_date', teacher.start_date);

        axios.post('http://localhost:3000/auth/add_teacher', formData)
            // .then(result => console.log(result.data))
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/manageteachers')
                } else {
                    console.log(result.data)
                    alert(result.data.Error || 'Error adding teacher')
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('An error occurred while processing your request');
            });
    }

    return (
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center mt-3'>
                <div className='p-3 rounded w-50 border'>
                    <h3 className='text-center'>Add Teacher</h3>
                    <form className='row g-1' onSubmit={handleSubmit}>
                        <div className='col-12'>
                            <label htmlFor='FullName' className='form-label'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='FullName'
                                id='FullName'
                                placeholder='Enter name'
                                className='form-control rounded-0'
                                onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
                                required />
                        </div>
                        <div className='col-12'>
                            <label htmlFor='inputEmail' className='form-label'>
                                Email
                            </label>
                            <input
                                type='emaill'
                                name='inputEmail'
                                id='inputEmail'
                                placeholder='Enter email'
                                className='form-control rounded-0'
                                autoComplete='off'
                                onChange={(e) => setTeacher({ ...teacher, email: e.target.value })}
                                required />
                        </div>
                        <div className='col-12'>
                            <label htmlFor='inputPassword' className='form-label'>
                                Password
                            </label>
                            <input
                                type='password'
                                id='inputPassword'
                                placeholder='Enter password'
                                className='form-control rounded-0'
                                onChange={(e) => setTeacher({ ...teacher, password: e.target.value })}
                                required />
                        </div>
                        <div className='col-12'>
                            <label htmlFor='phoneNumber' className='form-label'>
                                Phone Number
                            </label>
                            <input
                                type='number'
                                id='phoneNumber'
                                placeholder='Enter phone number'
                                className='form-control rounded-0'
                                onChange={(e) => setTeacher({ ...teacher, phone: e.target.value })}
                                required />
                        </div>
                        <div className='col-12'>
                            <label htmlFor='teaching_number' className='form-label'>
                                Teaching Registration Number
                            </label>
                            <input
                                type='number'
                                id='teaching_number'
                                placeholder='Enter registration number'
                                className='form-control rounded-0'
                                onChange={(e) => setTeacher({ ...teacher, teaching_number: e.target.value })}
                            />
                        </div>
                        <div className='col-12'>
                            <label htmlFor='date_of_birth' className='form-label'>
                                Date of Birth
                            </label>
                            <input
                                type='date'
                                id='date_of_birth'
                                name='date_of_birth'
                                placeholder='birthday'
                                className='form-control rounded-0'
                                onChange={(e) => setTeacher({ ...teacher, date_of_birth: e.target.value })}
                            />
                        </div>
                        <div className='col-12'>
                            <label htmlFor='address' className='form-label'>
                                Address
                            </label>
                            <input
                                type='text'
                                id='address'
                                placeholder='Enter home address'
                                className='form-control rounded-0'
                                onChange={(e) => setTeacher({ ...teacher, address: e.target.value })} />
                        </div>
                        <div className='col-12'>
                            <label htmlFor='philosophy' className='form-label'>
                                Teching Philosophy
                            </label>
                            <input
                                type='text'
                                id='philosophy'
                                placeholder='Enter teaching philosophy'
                                className='form-control rounded-0'
                                onChange={(e) => setTeacher({ ...teacher, teaching_philosophy: e.target.value })} />
                        </div>
                        <div className='col-12'>
                            <label htmlFor='start_date' className='form-label'>
                                Start Date
                            </label>
                            <input
                                type='date'
                                id='start_date'
                                name='start_date'
                                placeholder='start date'
                                className='form-control rounded-0'
                                onChange={(e) => setTeacher({ ...teacher, start_date: e.target.value })}
                            />
                        </div>
                        <div className='col-12 mb-3'>
                            <label htmlFor='profileImage' className='form-label'>
                                Select Image
                            </label>
                            <input
                                type='file'
                                id='profileImage'
                                name='image'
                                className='form-control rounded-0'
                                onChange={(e) => setTeacher({ ...teacher, profileImage: e.target.files[0] })} />
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                            <Link to={'/dashboard/manageteachers'} className="btn btn-light w-100">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div >
        </div>
    )
}

export default AddTeacher
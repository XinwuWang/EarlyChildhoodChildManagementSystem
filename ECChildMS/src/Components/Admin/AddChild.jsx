import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddChild = () => {
    const [child, setChild] = useState({
        name: '',
        email: '',
        password: '',
        date_of_birth: '',
        father_name: '',
        father_phone: '',
        mother_name: '',
        mother_phone: '',
        address: '',
        allergy: '',
        interests: '',
        notes: '',
        profileImage: '',
    });
    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(teacher);
        const formData = new FormData();
        formData.append('name', child.name);
        formData.append('email', child.email);
        formData.append('password', child.password);
        formData.append('father_name', child.father_name);
        formData.append('father_phone', child.father_phone);
        formData.append('mother_name', child.mother_name);
        formData.append('mother_phone', child.mother_phone);
        formData.append('address', child.address);
        formData.append('allergy', child.allergy);
        formData.append('interests', child.interests);
        formData.append('notes', child.notes);
        formData.append('image', child.profileImage);


        axios.post('http://localhost:3000/auth/add_child', formData)
            // .then(result => console.log(result.data))
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/managechildren')
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
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Add Child</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='FullName' className='form-label'>Name</label>
                        <input
                            type='text'
                            name='FullName'
                            id='FullName'
                            placeholder='Enter name'
                            className='form-control rounded-0'
                            onChange={(e) => setChild({ ...child, name: e.target.value })}
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
                            onChange={(e) => setChild({ ...child, email: e.target.value })}
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
                            onChange={(e) => setChild({ ...child, password: e.target.value })}
                            required />
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
                            onChange={(e) => setChild({ ...child, date_of_birth: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='dadName' className='form-label'>
                            Father&apos;s Name
                        </label>
                        <input
                            type='text'
                            id='dadName'
                            placeholder='Enter father&apos;s name'
                            className='form-control rounded-0'
                            onChange={(e) => setChild({ ...child, father_name: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='dadPhoneNum' className='form-label'>
                            Phone Number
                        </label>
                        <input
                            type='number'
                            id='dadPhoneNo'
                            placeholder='Enter phone number'
                            className='form-control rounded-0'
                            onChange={(e) => setChild({ ...child, father_phone: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='mumName' className='form-label'>
                            Mother&apos;s Name
                        </label>
                        <input
                            type='text' id='mumName'
                            placeholder='Enter mother&apos;s name'
                            className='form-control rounded-0'
                            onChange={(e) => setChild({ ...child, mother_name: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='mumPhoneNo' className='form-label'>
                            Phone Number
                        </label>
                        <input
                            type='number'
                            id='mumPhoneNum'
                            placeholder='Enter phone number'
                            className='form-control rounded-0'
                            onChange={(e) => setChild({ ...child, mother_phone: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address' className='form-label'>
                            Home Address
                        </label>
                        <input
                            type='text'
                            id='address'
                            placeholder='Enter home address'
                            className='form-control rounded-0'
                            onChange={(e) => setChild({ ...child, address: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='allergy' className='form-label'>
                            Allergy
                        </label>
                        <input
                            type='text'
                            id='allergy'
                            placeholder='Enter any allergy'
                            className='form-control rounded-0'
                            onChange={(e) => setChild({ ...child, allergy: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='interests' className='form-label'>
                            Interests & Hobbies
                        </label>
                        <input
                            type='text'
                            id='interests'
                            placeholder='Any interest or hobby'
                            className='form-control rounded-0'
                            onChange={(e) => setChild({ ...child, interests: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='notes' className='form-label'>
                            Other Notes
                        </label>
                        <input
                            type='text'
                            id='notes'
                            placeholder='Write a note'
                            className='form-control rounded-0'
                            onChange={(e) => setChild({ ...child, notes: e.target.value })}
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
                            onChange={(e) => setChild({ ...child, profileImage: e.target.files[0] })}
                        />
                    </div>
                    <div className='col-12 mt-4'>
                        <button className='btn btn-success w-100' type='submit'>Add Child</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default AddChild
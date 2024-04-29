import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const EditProfile = () => {

    const adminId = localStorage.getItem('adminId');
    const [admin, setAdmin] = useState({
        name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        address: '',
        start_date: ''
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/profile/${adminId}`)
            .then(result => {
                console.log(result.data)
                setAdmin(result.data[0])

            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch admin data');
            }).finally(() => {
                setLoading(false)
            });
    }, [adminId])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_profile/' + adminId, admin)
            .then(result => {
                // console.log(result.data)
                if (result.data.Status) {
                    navigate('/dashboard/profile/' + adminId)
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
                <h3 className='text-center'>Edit Your Profile</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='FullName' className='form-label'>Name</label>
                        <input type='text' name='FullName' id='FullName' placeholder='Enter name' value={admin.name}
                            className='form-control rounded-0' onChange={(e) => setAdmin({ ...admin, name: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputEmail' className='form-label'>
                            Email
                        </label>
                        <input type='emaill' name='inputEmail' id='inputEmail' placeholder='Enter email' value={admin.email} className='form-control rounded-0' autoComplete='off' onChange={(e) => setAdmin({ ...admin, email: e.target.value })} required />
                    </div>

                    <div className='col-12'>
                        <label htmlFor='date_of_birth' className='form-label'>
                            Date of Birth
                        </label>
                        <input type='date' id='date_of_birth' placeholder='Choose date of birth' value={admin.date_of_birth} className='form-control rounded-0' onChange={(e) => setAdmin({ ...admin, date_of_birth: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='phoneNumber' className='form-label'>
                            Phone
                        </label>
                        <input type='number' id='phoneNumber' placeholder='Enter phone number' value={admin.phone} className='form-control rounded-0' onChange={(e) => setAdmin({ ...admin, phone: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address' className='form-label'>
                            Address
                        </label>
                        <input type='text' id='address' placeholder='Enter home address' value={admin.address} className='form-control rounded-0' onChange={(e) => setAdmin({ ...admin, address: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='start_date' className='form-label'>
                            Start Date
                        </label>
                        <input type='date' id='start_date' placeholder='Choose start date' value={admin.start_date} className='form-control rounded-0' onChange={(e) => setAdmin({ ...admin, start_date: e.target.value })} required />
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="d-flex justify-content-center">
                            <button className='btn btn-success me-2' type='submit'>Save</button>
                            <Link to={'/dashboard/profile/' + adminId} className="btn btn-secondary">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default EditProfile
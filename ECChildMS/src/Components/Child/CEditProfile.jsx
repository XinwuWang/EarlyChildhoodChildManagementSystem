import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const CEditProfile = () => {
    const childId = localStorage.getItem('childId');
    const [child, setChild] = useState({
        name: '',
        email: '',
        date_of_birth: '',
        dad_name: '',
        dad_phone: '',
        mum_name: '',
        mum_phone: '',
        address: '',
        allergy: '',
        interests_and_hobbies: '',
        other_notes: '',
        profileImage: '',
        start_date: ''
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/child/profile/${childId}`)
            .then(result => {
                setChild(result.data[0])

            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch teacher data');
            }).finally(() => {
                setLoading(false)
            });
    }, [childId])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/child/edit_profile/' + childId, child)
            .then(result => {
                if (result.data.Status) {
                    navigate('/child_dashboard/profile/' + childId)
                    setTimeout(() => {
                        alert('Your profile updated successfully');
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

                <form className='row g-1' onSubmit={handleSubmit}>
                    <h3 className='text-center'>Edit Your Profile</h3>
                    <div className='col-12'>
                        <label htmlFor='FullName' className='form-label'><strong>Name</strong></label>
                        <input type='text' name='FullName' id='FullName' placeholder='Enter name' value={child.name}
                            className='form-control rounded-0' onChange={(e) => setChild({ ...child, name: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputEmail' className='form-label'>
                            <strong>Email</strong>
                        </label>
                        <input type='emaill' name='inputEmail' id='inputEmail' value={child.email} className='form-control rounded-0' disabled />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='date_of_birth' className='form-label'>
                            <strong>Date of Birth</strong>
                        </label>
                        <input type='date' id='date_of_birth' value={child.date_of_birth} className='form-control rounded-0' disabled />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='dad_name' className='form-label'><strong>Father&#39;s Name</strong></label>
                        <input type='text' name='dad_name' id='dad_name' placeholder='Enter father&#39;s name' value={child.dad_name}
                            className='form-control rounded-0' onChange={(e) => setChild({ ...child, dad_name: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='dad_phone' className='form-label'>
                            <strong>Father&#39;s Phone</strong>
                        </label>
                        <input type='number' id='dad_phone' placeholder='Enter father&#39;s phone number' value={child.dad_phone} className='form-control rounded-0' onChange={(e) => setChild({ ...child, dad_phone: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='mum_name' className='form-label'><strong>Mother&#39;s Name</strong></label>
                        <input type='text' name='mum_name' id='mum_name' placeholder='Enter mother&#39;s name' value={child.mum_name}
                            className='form-control rounded-0' onChange={(e) => setChild({ ...child, mum_name: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='mum_phone' className='form-label'>
                            <strong>Mother&#39;s Phone</strong>
                        </label>
                        <input type='number' id='mum_phone' placeholder='Enter mother&#39;s phone number' value={child.mum_phone} className='form-control rounded-0' onChange={(e) => setChild({ ...child, mum_phone: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address' className='form-label'>
                            <strong>Address</strong>
                        </label>
                        <input type='text' id='address' placeholder='Enter home address' value={child.address} className='form-control rounded-0' onChange={(e) => setChild({ ...child, address: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='allergy' className='form-label'>
                            <strong>Allergy</strong>
                        </label>
                        <input type='text' id='allergy' placeholder='Enter any allergies' value={child.allergy} className='form-control rounded-0' onChange={(e) => setChild({ ...child, allergy: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='interests' className='form-label'>
                            <strong>Interests & Hobbies</strong>
                        </label>
                        <input type='text' id='interests' placeholder='Enter interests and hobbies' value={child.interests_and_hobbies} className='form-control rounded-0' onChange={(e) => setChild({ ...child, interests_and_hobbies: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='start_date' className='form-label'>
                            <strong>Start Date</strong>
                        </label>
                        <input type='date' id='start_date' value={child.start_date} className='form-control rounded-0' disabled />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='other_notes' className='form-label'>
                            <strong>Other Notes</strong>
                        </label>
                        <input type='text' id='other_notes' placeholder='Enter any other notes' value={child.other_notes} className='form-control rounded-0' onChange={(e) => setChild({ ...child, other_notes: e.target.value })} />
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="d-flex justify-content-center">
                            <button className='btn btn-success me-2' type='submit'>Save</button>
                            <Link to={'/child_dashboard/profile/' + childId} className="btn btn-secondary">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default CEditProfile
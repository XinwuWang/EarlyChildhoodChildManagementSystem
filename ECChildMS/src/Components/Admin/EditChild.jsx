import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditChild = () => {
    const { id } = useParams()
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
        start_date: '',
        other_notes: '',
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/managechildren/${id}`)
            .then(result => {
                console.log(result.data)
                setChild(result.data[0])

            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch child data');
            }).finally(() => {
                setLoading(false)
            });
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_child/' + id, child)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/managechildren/' + id)
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
                    <h3 className='text-center'>Edit {child.name}&#39;s Profile</h3>
                    <div className='col-12'>
                        <label htmlFor='FullName' className='form-label'><strong>Name</strong></label>
                        <input type='text' name='FullName' id='FullName' placeholder='Enter name' value={child.name}
                            className='form-control rounded-0' onChange={(e) => setChild({ ...child, name: e.target.value })} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputEmail' className='form-label'>
                            <strong>Email</strong>
                        </label>
                        <input type='emaill' name='inputEmail' id='inputEmail' placeholder='Enter email' value={child.email} className='form-control rounded-0' autoComplete='off' onChange={(e) => setChild({ ...child, email: e.target.value })} required />
                    </div>

                    <div className='col-12'>
                        <label htmlFor='date_of_birth' className='form-label'>
                            <strong>Date of Birth</strong>
                        </label>
                        <input type='date' id='date_of_birth' placeholder='Choose date of birth' value={child.date_of_birth} className='form-control rounded-0' onChange={(e) => setChild({ ...child, date_of_birth: e.target.value })} required />
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
                        <input type='date' id='start_date' placeholder='Choose start date' value={child.start_date} className='form-control rounded-0' onChange={(e) => setChild({ ...child, start_date: e.target.value })} required />
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
                            <Link to={'/dashboard/managechildren/' + id} className="btn btn-secondary">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default EditChild
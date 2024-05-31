import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const ChangePassword = () => {
    const adminId = localStorage.getItem('adminId');
    const [admin, setAdmin] = useState({
        password: '',
    });

    const [loading, setLoading] = useState(true);
    const [isModified, setIsModified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/profile/${adminId}`)
            .then(result => {
                console.log(result.data)
                setAdmin(result.data[0])

            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch teacher data');
            }).finally(() => {
                setLoading(false)
            });
    }, [adminId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Check if password is modified
        setIsModified(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/change_password/' + adminId, admin)
            .then(result => {
                // console.log(result.data)
                if (result.data.Status) {
                    alert('Password changed successfully!')
                    window.location.reload()
                    navigate('/dashboard/change_password/' + adminId)
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
        <div className='container'>
            <div className="container p-2">
                <div className="d-flex justify-content-between align-items-center mt-auto m-2">
                    <h1 className="display-4 fw-normal">Change Password</h1>
                    <div>
                        <Link to={'/dashboard'} className='btn btn-lg p-2' title="Dashboard"><i className="bi bi-speedometer2 text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
            <div className='d-flex justify-content-center align-items-center mt-3'>
                <div className='p-3 rounded w-50 border'>
                    <form className='row g-1' onSubmit={handleSubmit}>
                        <div className='col-12'>
                            <label htmlFor='password' className='form-label'>
                                <strong>New Password</strong>
                            </label>
                            <input type='password' name='password' id='password' placeholder='Enter new password' className='form-control rounded-0' autoComplete='off' onChange={handleChange} required />
                        </div>
                        <div className='col-12 pt-3'>
                            <div className="d-flex justify-content-center">
                                <button className='btn btn-success me-2' type='submit' disabled={!isModified}>Save</button>
                                <Link to={'/dashboard/change_password/' + adminId} className="btn btn-secondary" onClick={() => window.location.reload()}>Reset</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div>
    )
}

export default ChangePassword
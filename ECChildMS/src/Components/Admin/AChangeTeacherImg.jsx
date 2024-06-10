import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AChangeTeacherImg = () => {
    const { id } = useParams()
    const [teacher, setTeacher] = useState({
        image: '',
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/manageteachers/${id}`)
            .then(result => {
                setTeacher(result.data[0])

            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch teacher data');
            }).finally(() => {
                setLoading(false)
            });
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', teacher.image);

        axios.put(`http://localhost:3000/auth/manageteachers/${id}/change_photo`, formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/manageteachers/' + id)
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
                    <h3 className='text-center'>Update {teacher.name}&#39;s Image</h3>

                    <div className='col-12'>
                        <label htmlFor='profile_img' className='form-label'>
                            <strong>Profile Image</strong>
                        </label>
                        <input type='file' name='image' id='profile_img' className='form-control rounded-0' onChange={(e) => setTeacher({ ...teacher, image: e.target.files[0] })} required />
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="d-flex justify-content-center">
                            <button className='btn btn-success me-2' type='submit'>Save</button>
                            <Link to={'/dashboard/manageteachers/' + id} className="btn btn-secondary">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default AChangeTeacherImg
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const TUpdateProfileImg = () => {
    const { id } = useParams()
    const [teacher, setTeacher] = useState({
        image: '',
    });

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', teacher.image);

        axios.put(`http://localhost:3000/teacher/teacher_profile/${id}/change_photo`, formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/teacher_profile/' + id)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }



    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>

                <form className='row g-1' onSubmit={handleSubmit}>
                    <h3 className='text-center'>Update Your Image</h3>

                    <div className='col-12'>
                        <label htmlFor='profile_img' className='form-label'>
                            <strong>Profile Image</strong>
                        </label>
                        <input type='file' name='image' id='profile_img' className='form-control rounded-0' onChange={(e) => setTeacher({ ...teacher, image: e.target.files[0] })} required />
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="d-flex justify-content-center">
                            <button className='btn btn-success me-2' type='submit'>Save</button>
                            <Link to={'/teacher_dashboard/teacher_profile/' + id} className="btn btn-secondary">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TUpdateProfileImg
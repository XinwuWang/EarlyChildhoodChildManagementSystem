import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const AddCentreInfo = () => {
    const admin_id = localStorage.getItem('adminId');
    const [centreInfo, setCentreInfo] = useState({
        title: '',
        content_one: '',
        content_two: '',
        content_three: '',
        admin_id: admin_id,
        update_date: '',
        update_time: ''
    });
    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()
        const now = new Date();
        const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        setCentreInfo(prevState => ({
            ...prevState,
            update_date: currentDate,
            update_time: currentTime
        }));

        const Data = {
            title: centreInfo.title,
            content_one: centreInfo.content_one,
            content_two: centreInfo.content_two,
            content_three: centreInfo.content_three,
            admin_id: centreInfo.admin_id,
            update_date: currentDate,
            update_time: currentTime
        }


        axios.post('http://localhost:3000/auth/add_centreinfo', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/centreintro')
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
                <h3 className='text-center'>Add Centre Information</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Enter a title'
                            className='form-control rounded-0'
                            onChange={(e) => setCentreInfo({ ...centreInfo, title: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='content_one' className='form-label'>
                            Content One
                        </label>
                        <textarea
                            name='content_one'
                            id='content_one'
                            placeholder='Enter the first content'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setCentreInfo({ ...centreInfo, content_one: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='content_two' className='form-label'>
                            Content Two
                        </label>
                        <textarea
                            name='content_two'
                            id='content_two'
                            placeholder='Enter the second content'
                            className='form-control rounded-0'
                            rows="4"
                            cols="50"
                            onChange={(e) => setCentreInfo({ ...centreInfo, content_two: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='content_three' className='form-label'>
                            Content Three
                        </label>
                        <textarea
                            name='content_three'
                            id='content_three'
                            placeholder='Enter the third content'
                            className='form-control rounded-0'
                            rows="4"
                            cols="50"
                            onChange={(e) => setCentreInfo({ ...centreInfo, content_three: e.target.value })}
                        />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/dashboard/centreintro'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default AddCentreInfo
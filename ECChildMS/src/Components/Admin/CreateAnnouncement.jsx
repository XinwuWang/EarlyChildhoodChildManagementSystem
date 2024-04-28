import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const CreateAnnouncement = () => {
    const admin_id = localStorage.getItem('adminId');
    const [announcement, setAnnouncement] = useState({
        title: '',
        content: '',
        post_date: '',
        post_time: '',
        person_who_posts: admin_id
    });
    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()
        const now = new Date();
        const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        setAnnouncement(prevState => ({
            ...prevState,
            update_date: currentDate,
            update_time: currentTime
        }));

        const Data = {
            title: announcement.title,
            content: announcement.content,
            post_date: currentDate,
            post_time: currentTime,
            person_who_posts: admin_id,
        }


        axios.post('http://localhost:3000/auth/create_announcement', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/announcement')
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
                <h3 className='text-center'>Create an Announcement</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Enter a title'
                            className='form-control rounded-0'
                            onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='content' className='form-label'>
                            Content
                        </label>
                        <textarea
                            name='content'
                            id='content'
                            placeholder='Enter the content'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
                            required />
                    </div>


                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/dashboard/announcement'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default CreateAnnouncement
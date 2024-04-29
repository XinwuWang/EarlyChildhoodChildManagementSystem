import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const AddTeachingTips = () => {
    const teacherId = localStorage.getItem('teacherId');
    const [resource, setResource] = useState({
        title: '',
        resource_description: '',
        link: '',
        update_date: '',
        person_who_adds: teacherId
    });
    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()
        const now = new Date();
        const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        setResource(prevState => ({
            ...prevState,
            update_date: currentDate,
            update_time: currentTime
        }));

        const Data = {
            title: resource.title,
            resource_description: resource.resource_description,
            link: resource.link,
            update_date: currentDate,
            person_who_adds: teacherId
        }


        axios.post('http://localhost:3000/teacher/add_resource', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/teaching_resource')
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
                <h3 className='text-center'>Add a Resource</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Enter a title'
                            className='form-control rounded-0'
                            onChange={(e) => setResource({ ...resource, title: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='description' className='form-label'>
                            Resource Description
                        </label>
                        <textarea
                            name='description'
                            id='description'
                            placeholder='Enter the description'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setResource({ ...resource, resource_description: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='link' className='form-label'>
                            Link
                        </label>
                        <textarea
                            name='link'
                            id='link'
                            placeholder='Enter the link'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setResource({ ...resource, link: e.target.value })}
                            required />
                    </div>


                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/teaching_resource'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default AddTeachingTips
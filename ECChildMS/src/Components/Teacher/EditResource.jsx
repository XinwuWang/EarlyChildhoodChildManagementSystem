import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const EditResource = () => {
    const teacherId = localStorage.getItem('teacherId');
    const { id } = useParams()
    const [resource, setResource] = useState({
        title: '',
        resource_description: '',
        link: '',
        update_date: '',
        person_who_adds: teacherId
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/teacher/teaching_resource/' + id)
            .then(result => {
                // console.log(result.data)
                if (result.data.Status && result.data.Result.length > 0) {
                    // const teacherData = result.data.Result[0];
                    setResource({
                        ...resource,
                        title: result.data.Result[0].title,
                        resource_description: result.data.Result[0].resource_description,
                        link: result.data.Result[0].link,
                        update_date: result.data.Result[0].update_date,
                        person_who_adds: teacherId
                    })
                } else {
                    throw new Error(result.data.Error || 'Information data not found');
                }
            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch centre information data');
            }).finally(() => {
                setLoading(false)
            });
    }, [id]);

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

        axios.put('http://localhost:3000/teacher/edit_resource/' + id, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/teaching_resource')
                    setTimeout(() => {
                        alert('Resource updated successfully');
                    }, 300);
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
                <h3 className='text-center'>Edit Resource Information</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Enter a title'
                            className='form-control rounded-0'
                            value={resource.title}
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
                            value={resource.resource_description}
                            className='form-control rounded-0'
                            rows="4"
                            cols="50"
                            autoComplete='off'
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
                            value={resource.link}
                            className='form-control rounded-0'
                            rows="4"
                            cols="50"
                            onChange={(e) => setResource({ ...resource, link: e.target.value })}
                        />
                    </div>

                    <div className='col-12 mt-2'>
                        <p className='fw-light'>*Last update on {resource.update_date}</p>
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

export default EditResource
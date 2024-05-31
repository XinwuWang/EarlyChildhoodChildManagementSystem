import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditCentreinfo = () => {
    const admin_id = localStorage.getItem('adminId');
    const { id } = useParams()
    const [centreInfo, setCentreInfo] = useState({
        title: '',
        content_one: '',
        content_two: '',
        content_three: '',
        admin_id: admin_id,
        update_date: '',
        update_time: ''
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/centreintro/' + id)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setCentreInfo({
                        ...centreInfo,
                        title: result.data.Result[0].title,
                        content_one: result.data.Result[0].content_one,
                        content_two: result.data.Result[0].content_two,
                        content_three: result.data.Result[0].content_three,
                        admin_id: result.data.Result[0].admin_id,
                        update_date: result.data.Result[0].update_date,
                        update_time: result.data.Result[0].update_time
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

        axios.put('http://localhost:3000/auth/edit_centreinfo/' + id, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/centreintro')
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
                <h3 className='text-center'>Edit Centre Information</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Enter a title'
                            className='form-control rounded-0'
                            value={centreInfo.title}
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
                            value={centreInfo.content_one}
                            className='form-control rounded-0'
                            rows="4"
                            cols="50"
                            autoComplete='off'
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
                            value={centreInfo.content_two}
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
                            value={centreInfo.content_three}
                            className='form-control rounded-0'
                            rows="4"
                            cols="50"
                            onChange={(e) => setCentreInfo({ ...centreInfo, content_three: e.target.value })}
                        />
                    </div>
                    <div className='col-12 mt-2'>
                        <p className='fw-light'>*Last update at {centreInfo.update_time} on {centreInfo.update_date}</p>
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

export default EditCentreinfo
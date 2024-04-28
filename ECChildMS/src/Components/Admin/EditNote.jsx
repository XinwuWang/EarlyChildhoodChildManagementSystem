import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditNote = () => {
    const admin_id = localStorage.getItem('adminId');
    const { id } = useParams()
    const [userInput, setUserInput] = useState({
        title: '',
        content: '',
        admin_id: admin_id,
        update_date: '',
        update_time: ''
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/note/' + id)
            .then(result => {
                // console.log(result.data)
                if (result.data.Status && result.data.Result.length > 0) {
                    // const teacherData = result.data.Result[0];
                    setUserInput({
                        ...userInput,
                        title: result.data.Result[0].title,
                        content: result.data.Result[0].content,
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
                alert('Failed to fetch data');
            }).finally(() => {
                setLoading(false)
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const now = new Date();
        const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;



        setUserInput(prevState => ({
            ...prevState,
            update_date: currentDate,
            update_time: currentTime
        }));

        const Data = {
            title: userInput.title,
            content: userInput.content,
            admin_id: userInput.admin_id,
            update_date: currentDate,
            update_time: currentTime
        }

        axios.put('http://localhost:3000/auth/edit_note/' + id, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/note')
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
                <h3 className='text-center'>Edit Note</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Enter a title'
                            className='form-control rounded-0'
                            value={userInput.title}
                            onChange={(e) => setUserInput({ ...userInput, title: e.target.value })}
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
                            value={userInput.content}
                            className='form-control rounded-0'
                            rows="4"
                            cols="50"
                            autoComplete='off'
                            onChange={(e) => setUserInput({ ...userInput, content: e.target.value })}
                            required />
                    </div>



                    <div className='col-12 mt-2'>
                        <p className='fw-light'>*Last update at {userInput.update_time} on {userInput.update_date}</p>
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/dashboard/note'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div >
        </div >
    )
}
export default EditNote
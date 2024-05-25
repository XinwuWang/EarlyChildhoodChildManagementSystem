import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const EditLSDetail = () => {
    const { id } = useParams();
    const teacherId = localStorage.getItem('teacherId');
    const [learningStory, setLearningStory] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/child_ls/${id}`)
            .then(result => {
                if (result.data.Status) {
                    setLearningStory(result.data.Result[0]);
                } else {
                    setError(result.data.Error);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError('Failed to fetch data');
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date();
        const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

        const updatedLearningStory = {
            ...learningStory,
            update_date: currentDate,
            person_who_wrote: teacherId
        };

        axios.put(`http://localhost:3000/teacher/edit_ls_detail/${id}`, updatedLearningStory)
            .then(result => {
                if (result.data.Status) {
                    navigate(`/teacher_dashboard/child_ls/${id}`);
                    setTimeout(() => {
                        alert('Learning story updated successfully');
                    }, 300);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Edit Learning Story</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div>
                        <h4 className='text-center'>Child ID: {id}</h4>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='child_name' className='form-label'>Child</label>
                        <input
                            type='text'
                            name='child_name'
                            id='child_name'
                            className='form-control rounded-0'
                            value={learningStory.child_name}
                            readOnly
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            className='form-control rounded-0'
                            value={learningStory.title}
                            onChange={(e) => setLearningStory({ ...learningStory, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='content' className='form-label'>Content</label>
                        <textarea
                            rows="15"
                            cols="50"
                            name='content'
                            id='content'
                            className='form-control rounded-0'
                            value={learningStory.content}
                            onChange={(e) => setLearningStory({ ...learningStory, content: e.target.value })}
                            required
                        />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={`/teacher_dashboard/child_ls/${id}`} className='btn btn-light w-100'>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLSDetail
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const TEditLS = () => {
    const { id } = useParams()
    const [learningStory, setLearningStory] = useState({
        created_month: '',
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/learning_story/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setLearningStory({
                        ...learningStory,
                        created_month: result.data.Result[0].created_month,
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


        const Data = {
            created_month: learningStory.created_month
        }

        axios.put(`http://localhost:3000/teacher/edit_ls/${id}`, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/learning_story')
                    setTimeout(() => {
                        alert('Learning story month updated successfully');
                    }, 300);
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
                <h3 className='text-center'>Edit Month</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='ls_month' className='form-label'>Month</label>
                        <input
                            type='month'
                            min='2024-01'
                            name='ls_month'
                            id='ls_month'
                            className='form-control rounded-0'
                            value={learningStory.created_month}
                            onChange={(e) => setLearningStory({ ...learningStory, created_month: e.target.value })}
                            required />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/learning_story'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default TEditLS
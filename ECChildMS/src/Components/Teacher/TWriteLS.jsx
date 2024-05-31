import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'


const TWriteLS = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const teacherId = localStorage.getItem('teacherId')
    const teacherName = localStorage.getItem('teacherName')
    const [learningStory, setLearningStory] = useState({
        child_id: '',
        title: '',
        content: '',
        image_one: '',
        image_two: '',
        image_three: '',
        person_who_wrote: teacherId,
        update_date: '',
        created_month: id
    })

    const [child, setChild] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/teacher/children')
            .then(result => {
                if (result.data.Status) {
                    setChild(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const now = new Date();
        const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

        setLearningStory(prevState => ({
            ...prevState,
            update_date: currentDate,
        }));

        const Data = {
            child_id: learningStory.child_id,
            title: learningStory.title,
            content: learningStory.content,
            image_one: learningStory.image_one,
            image_two: learningStory.image_two,
            image_three: learningStory.image_three,
            person_who_wrote: learningStory.person_who_wrote,
            update_date: currentDate,
            created_month: learningStory.created_month
        }


        axios.post('http://localhost:3000/teacher/write_a_learning_story', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/learning_story_detail/' + id)
                } else {
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
                <h3 className='text-center'>Write a Learning Story</h3>
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Child</strong>
                        </label>
                        <select name='child' id='child' className='form-select'
                            onChange={(e) => {
                                setLearningStory({ ...learningStory, child_id: e.target.value });
                            }} required>
                            <option value='' disabled selected>Select a child</option>
                            {
                                child.map(c => {
                                    return <option value={c.id} key={c.id}>{c.id} {c.name}</option>
                                })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='title' className='form-label'><strong>Title</strong></label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            className='form-control rounded-0'
                            onChange={(e) => setLearningStory({ ...learningStory, title: e.target.value })}
                            required />
                    </div>
                    <div>
                        <label htmlFor='content' className='form-label'><strong>Content</strong></label>
                        <textarea
                            rows="15"
                            cols="50"
                            name='content'
                            id='contentp'
                            className='form-control rounded-0'
                            onChange={(e) => setLearningStory({ ...learningStory, content: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='creator' className='form-label'><strong>Creator</strong></label>
                        <input
                            type='text'
                            name='creator'
                            id='creator'
                            className='form-control rounded-0'
                            placeholder={teacherName}
                            readOnly />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/learning_story_detail/' + id} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TWriteLS
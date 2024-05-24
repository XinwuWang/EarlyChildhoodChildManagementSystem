import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const TLSStartNewMonth = () => {
    const teacherId = localStorage.getItem('teacherId')
    const teacherName = localStorage.getItem('teacherName')
    const [learningStory, setLearningStory] = useState({
        created_month: '',
        created_by: teacherId,
    });
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()

        const Data = {
            created_month: learningStory.created_month,
            created_by: learningStory.created_by
        }

        axios.post('http://localhost:3000/teacher/start_new_month', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/learning_story');
                } else {
                    console.log(result.data);
                    if (result.data.Error === 'Month already exists') {
                        alert('The month you are trying to add already exists.');
                    } else {
                        alert(result.data.Error || 'Error adding information');
                    }
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('An error occurred while processing your request');
            });
    };


    //     axios.post('http://localhost:3000/teacher/start_new_month', Data)
    //         .then(result => {
    //             if (result.data.Status) {
    //                 navigate('/teacher_dashboard/learning_story')
    //             } else {
    //                 console.log(result.data)
    //                 alert(result.data.Error || 'Error adding information')
    //             }
    //         })
    //         .catch(err => {
    //             console.error('Error:', err);
    //             alert('An error occurred while processing your request');
    //         });
    // }



    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Start a New Month</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='month' className='form-label'><strong>Month</strong></label>
                        <input
                            type='month'
                            min='2024-01'
                            name='month'
                            id='month'
                            className='form-control rounded-0'
                            onChange={(e) => setLearningStory({ ...learningStory, created_month: e.target.value })}
                            required />
                    </div>
                    <div>
                        <label htmlFor='person_who_created' className='form-label'><strong>Created by</strong></label>
                        <input
                            type='text'
                            name='person_who_created'
                            id='person_who_created'
                            value={teacherName}
                            className='form-control rounded-0'
                            disabled />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/learning_story'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TLSStartNewMonth
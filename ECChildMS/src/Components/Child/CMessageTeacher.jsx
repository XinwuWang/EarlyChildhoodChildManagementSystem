import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const CMessageTeacher = () => {
    const navigate = useNavigate()
    const childId = localStorage.getItem('childId')
    const [messageTeacher, setMessageTeacher] = useState({
        child_sender: childId,
        title: '',
        content: '',
        sent_date: '',
        sent_time: '',
        teacher_receiver: ''
    })

    const [teacher, setTeacher] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/child/teachers')
            .then(result => {
                if (result.data.Status) {
                    setTeacher(result.data.Result)
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
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;


        const Data = {
            child_sender: messageTeacher.child_sender,
            title: messageTeacher.title,
            content: messageTeacher.content,
            sent_date: currentDate,
            sent_time: currentTime,
            teacher_receiver: messageTeacher.teacher_receiver
        }


        axios.post('http://localhost:3000/child/message_a_teacher', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/child_dashboard/message/' + childId)
                    setTimeout(() => {
                        alert('Message sent successfully');
                    }, 300);
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
                <h3 className='text-center'>Message a Teacher</h3>
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>

                    <div className='col-12'>
                        <label htmlFor='teacher' className='form-label'>
                            <strong>Send To</strong>
                        </label>
                        <select name='teacher' id='teacher' className='form-select'
                            onChange={(e) => {
                                setMessageTeacher({ ...messageTeacher, teacher_receiver: e.target.value });

                            }}

                            required>
                            <option value='' disabled selected>Select a teacher</option>
                            {
                                teacher.map(c => {
                                    return <option value={c.id} key={c.id}>{c.id} {c.name}</option>
                                })}
                        </select>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='title' className='form-label'><strong>Title</strong></label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Enter a title'
                            className='form-control rounded-0'
                            onChange={(e) => {
                                setMessageTeacher({ ...messageTeacher, title: e.target.value })
                            }}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='content' className='form-label'><strong>Content</strong></label>
                        <textarea
                            rows="4"
                            cols="50"
                            name='content'
                            id='content'
                            placeholder='Text here'
                            className='form-control rounded-0'
                            onChange={(e) => setMessageTeacher({ ...messageTeacher, content: e.target.value })}
                            required />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/child_dashboard/message/' + childId} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default CMessageTeacher
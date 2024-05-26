import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const TMessageChild = () => {
    const navigate = useNavigate()
    const teacherId = localStorage.getItem('teacherId')
    const [messageChild, setMessageChild] = useState({
        teacher_sender: teacherId,
        title: '',
        content: '',
        sent_date: '',
        sent_time: '',
        child_receiver: ''
    })

    const [child, setChild] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/teacher/children')
            .then(result => {
                if (result.data.Status) {
                    // console.log(result.data.Result)
                    setChild(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    // console.log(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        const now = new Date();
        const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;


        const Data = {
            teacher_sender: messageChild.teacher_sender,
            title: messageChild.title,
            content: messageChild.content,
            sent_date: currentDate,
            sent_time: currentTime,
            child_receiver: messageChild.child_receiver
        }


        axios.post('http://localhost:3000/teacher/message_a_child', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/message/' + teacherId)
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
                <h3 className='text-center'>Message a Child</h3>
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>

                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Send To</strong>
                        </label>
                        <select name='child' id='child' className='form-select'
                            onChange={(e) => {
                                setMessageChild({ ...messageChild, child_receiver: e.target.value });

                            }}

                            required>
                            <option value='' disabled selected>Select a child</option>
                            {
                                child.map(c => {
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
                                console.log(e.target.value)
                                setMessageChild({ ...messageChild, title: e.target.value })
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
                            onChange={(e) => setMessageChild({ ...messageChild, content: e.target.value })}
                            required />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/message/' + teacherId} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TMessageChild
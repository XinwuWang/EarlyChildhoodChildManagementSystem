import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const CMessageAdmin = () => {
    const navigate = useNavigate()
    const childId = localStorage.getItem('childId')
    const [messageAdmin, setMessageAdmin] = useState({
        child_sender: childId,
        title: '',
        content: '',
        sent_date: '',
        sent_time: '',
        admin_receiver: ''
    })

    const [admin, setAdmin] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/child/admin')
            .then(result => {
                if (result.data.Status) {
                    setAdmin(result.data.Result)
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
            child_sender: messageAdmin.child_sender,
            title: messageAdmin.title,
            content: messageAdmin.content,
            sent_date: currentDate,
            sent_time: currentTime,
            admin_receiver: messageAdmin.admin_receiver
        }


        axios.post('http://localhost:3000/child/message_admin', Data)
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
                <h3 className='text-center'>Message Admin</h3>
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>

                    <div className='col-12'>
                        <label htmlFor='admin' className='form-label'>
                            <strong>Send To</strong>
                        </label>
                        <select name='admin' id='admin' className='form-select'
                            onChange={(e) => {
                                setMessageAdmin({ ...messageAdmin, admin_receiver: e.target.value });

                            }}

                            required>
                            <option value='' disabled selected>Select admin</option>
                            {
                                admin.map(c => {
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
                                setMessageAdmin({ ...messageAdmin, title: e.target.value })
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
                            onChange={(e) => setMessageAdmin({ ...messageAdmin, content: e.target.value })}
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

export default CMessageAdmin
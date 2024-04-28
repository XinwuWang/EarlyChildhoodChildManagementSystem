import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'



const Announcement = () => {
    const [announcement, setAnnouncement] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/announcement')
            .then(result => {
                // console.log(result.data)
                if (result.data.Status) {
                    console.log(result.data.Result)
                    setAnnouncement(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/auth/delete_announcement/' + id)
            .then(result => {
                if (result.data.Status) {
                    setAnnouncement(announcement.filter(e => e.id !== id))
                    window.location.reload()
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="d-flex flex-column flex-md-row p-4 gap-5 py-md-5 align-items-center justify-content-center">
                <div className="list-group w-50">
                    {
                        announcement.map(e => (
                            <div key={e.id} className="list-group-item list-group-item-action d-flex gap-3 py-4" aria-current="true">
                                <i className="bi bi-megaphone"></i>
                                <div className="d-flex flex-column gap-2 w-100 justify-content-between">
                                    <div>
                                        <h4 className="mb-4"><strong>{e.title}</strong></h4>
                                        <p className="mb-3 opacity-75">{e.content}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <small className="opacity-50 text-nowrap">Posted at {e.post_time} on {e.post_date} by {e.admin_name}</small>
                                        <button type='button' className="btn btn-black p-0" title='delete' onClick={() => handleDelete(e.id)}>
                                            <i className="bi bi-trash" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="container pt-5 mb-3">
                <div className="row">
                    <div className="col text-center">
                        <Link to='/dashboard/create_announcement' className='btn btn-success'>Create Announcement</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Announcement
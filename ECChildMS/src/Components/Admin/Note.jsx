import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const Note = () => {
    const [userInput, setUserInput] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/note')
            .then(result => {
                // console.log(result.data)
                if (result.data.Status) {
                    console.log(result.data.Result)
                    setUserInput(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/auth/delete_note/' + id)
            .then(result => {
                if (result.data.Status) {
                    setUserInput(userInput.filter(e => e.note_id !== id))
                    window.location.reload()
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='px-5 mt-5'>
            <div className='d-flex justify-content-center'>
                <h3>Notes</h3>
            </div>
            <div className="row pt-3 align-items-center">
                {
                    userInput.map(e => (
                        <div className="col-lg-4 pt-5" key={e.id}>
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-header py-3 text-center">
                                        <h4 className="my-0 fw-normal">{e.title}</h4>
                                    </div>
                                    <div className='mt-2 text-center'>
                                        <p className='fw-lighter'>{e.update_date} at {e.update_time}</p>
                                    </div>
                                    <div className="card-body d-flex flex-column" style={{ height: '300px' }}>
                                        <div>
                                            <p>{e.content}</p>
                                        </div>
                                        <div className='mt-auto'>
                                            <div className="row">
                                                <div className="col text-center">
                                                    <Link to={`/dashboard/edit_note/` + e.id} className="btn btn-sm btn-outline-dark m-3">Edit</Link>
                                                    <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => handleDelete(e.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>


            <div className="container pt-5 mb-3">
                <div className="row">
                    <div className="col text-center">
                        <Link to='/dashboard/add_note' className='btn btn-success'>Add Note</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Note
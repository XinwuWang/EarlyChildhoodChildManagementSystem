import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


const Note = () => {
    const [userInput, setUserInput] = useState([])
    const adminId = localStorage.getItem('adminId')

    useEffect(() => {
        axios.get('http://localhost:3000/auth/note/' + adminId)
            .then(result => {
                if (result.data.Status) {
                    setUserInput(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("ALERT! Are you sure you want to delete this note?")) {
            axios.delete(`http://localhost:3000/auth/delete_note/${adminId}/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        setUserInput(userInput.filter(e => e.id !== id))
                        window.location.reload()
                    } else {
                        alert(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <div className="container p-2">
                <div className="d-flex justify-content-between align-items-center mt-auto m-2">
                    <h1 className="display-4 fw-normal">Note</h1>
                    <div>
                        <Link to='/dashboard/add_note' className='btn btn-lg p-2' title='Write a note'><i className="bi bi-plus-square"></i></Link>
                        <Link to={'/dashboard'} className='btn btn-lg p-2' title="Dashboard"><i className="bi bi-speedometer2 text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
            <div className='px-5 mt-2'>
                <div className="row pt-2 align-items-center">
                    {
                        userInput.map(e => (
                            <div className="col-lg-4 pt-3" key={e.id}>
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
                                                    <div className="text-end">
                                                        <Link to={`/dashboard/edit_note/${adminId}/${e.id}`} className='btn btn-black p-0 me-3' title='Edit'><i className="bi bi-pencil-square"></i></Link>
                                                        <button type='button' className="btn btn-black p-0" title='Delete' onClick={() => handleDelete(e.id)}>
                                                            <i className="bi bi-trash" />
                                                        </button>
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


                <div className="container pt-2">
                </div>
            </div >
        </div>
    )
}

export default Note
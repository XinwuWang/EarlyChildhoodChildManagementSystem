import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const TAccidentReport = () => {
    const [accidentForm, setAccidentForm] = useState([])

    // const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');


    useEffect(() => {
        axios.get('http://localhost:3000/teacher/accident_form')
            .then(result => {
                if (result.data.Status) {
                    setAccidentForm(result.data.Result)
                    console.log(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("ALERT! Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:3000/teacher/delete_accident_form/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        setAccidentForm(accidentForm.filter(e => e.id !== id));
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
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-auto p-3 m-3">
                    <h1 className="display-4 fw-normal">Accident Form</h1>
                    <div>
                        <Link to={'/teacher_dashboard/add_accident_form'} className='btn btn-lg p-2' title="Add a accident form"><i className="bi bi-clipboard2-plus-fill text-dark"></i></Link>
                        <Link to={'/teacher_dashboard/document'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
            <div className="table-responsive small">
                <table className="table table-striped table-sm m-2">
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Date</th>
                            <th scope="col">Child Name</th>
                            <th scope="col">Supervisor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accidentForm.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>
                                    <td><Link
                                        to={`/teacher_dashboard/accident_form/${e.id}`
                                        }
                                    >{e.accident_date}</Link></td>
                                    <td>{e.child_name}</td>
                                    <td>{e.supervisor_name}</td>
                                    <td>
                                        {/* <Link to={`/teacher_dashboard/accident_form/${e.id}`} className='btn btn-black p-0 me-3' title='View details'>
                                            <i className="bi bi-box-arrow-in-right"></i>
                                        </Link> */}
                                        <button type='button' className="btn btn-black p-0" title='Delete' onClick={() => handleDelete(e.id)}>
                                            <i className="bi bi-trash" />
                                        </button>
                                    </td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >

    )
}

export default TAccidentReport
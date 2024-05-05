import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const TBottleChart = () => {
    const [bottleChart, setBottleChart] = useState([])

    // const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');


    useEffect(() => {
        axios.get('http://localhost:3000/teacher/bottle_chart')
            .then(result => {
                if (result.data.Status) {
                    setBottleChart(result.data.Result)
                    console.log(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("ALERT! Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:3000/teacher/delete_bottle_record/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        setBottleChart(bottleChart.filter(e => e.id !== id));
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
                    <h1 className="display-4 fw-normal">Formula Feeding Chart</h1>
                    <div>
                        <Link to={'/teacher_dashboard/add_bottle_record'} className='btn btn-lg p-2' title="Add a sleep record"><i className="bi bi-clipboard2-plus-fill text-dark"></i></Link>
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
                            <th scope="col">Time One</th>
                            <th scope="col">Time Two</th>
                            <th scope="col">Time Three</th>
                            <th scope="col">Note</th>
                            <th scope="col">Supervisor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bottleChart.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>

                                    <td>{e.bottle_date}</td>
                                    <td>{e.child_name}</td>
                                    <td>{e.time_one}</td>
                                    <td>{e.time_two}</td>
                                    <td>{e.time_three}</td>
                                    <td>{e.note}</td>
                                    <td>{teacherName}</td>
                                    <td>
                                        <Link to={`/teacher_dashboard/edit_bottle_record/${e.id}`} className='btn btn-black p-0 me-3' title='Edit'>
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
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

export default TBottleChart
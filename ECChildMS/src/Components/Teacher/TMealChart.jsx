import { Link } from "react-router-dom"
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


const TMealChart = () => {
    const [meal, setMeal] = useState([])
    // const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');


    useEffect(() => {
        axios.get('http://localhost:3000/teacher/meal_chart')
            .then(result => {
                if (result.data.Status) {
                    setMeal(result.data.Result)
                    console.log(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("ALERT! Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:3000/teacher/delete_meal/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        setMeal(meal.filter(e => e.id !== id))
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
                    <h1 className="display-4 fw-normal">Meal Chart</h1>
                    <div>
                        <Link to={'/teacher_dashboard/add_meal'} className='btn btn-lg p-2' title="Add a meal chart"><i className="bi bi-clipboard2-plus-fill text-dark"></i></Link>
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
                            <th scope="col">Morning Tea</th>
                            <th scope="col">Lunch</th>
                            <th scope="col">Afternoon Tea</th>
                            <th scope="col">Supervisor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            meal.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>
                                    {/* Insert console.log() here */}
                                    {console.log({
                                        id: e.id,
                                        date: e.meal_date,
                                        morning_tea: e.morning_tea,
                                        lunch: e.lunch,
                                        afternoon_tea: e.afternoon_tea,
                                        supervisor: teacherName
                                    })}
                                    <td><Link
                                        to={{
                                            pathname: `/teacher_dashboard/meal_detail/${e.id}`,
                                            state: {
                                                id: e.id,
                                                date: e.meal_date,
                                                morning_tea: e.morning_tea,
                                                lunch: e.lunch,
                                                afternoon_tea: e.afternoon_tea,
                                                supervisor: teacherName
                                            }
                                        }}

                                    >{e.meal_date}</Link></td>
                                    <td>{e.morning_tea}</td>
                                    <td>{e.lunch}</td>
                                    <td>{e.afternoon_tea}</td>
                                    <td>{teacherName}</td>
                                    <td>
                                        <Link to={`/teacher_dashboard/edit_meal/${e.id}`} className='btn btn-black p-0 me-3' title='Edit'>
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        <button type='button' className="btn btn-black p-0" title='Delete' onClick={() => handleDelete(e.id)}>
                                            <i className="bi bi-trash" />
                                        </button></td>
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

export default TMealChart
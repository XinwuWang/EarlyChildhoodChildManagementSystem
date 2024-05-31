import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const TMealDetail = () => {

    const { id } = useParams()
    const [meal, setMeal] = useState({
        date: '',
        morning_tea: '',
        lunch: '',
        afternoon_tea: '',
        supervisor: ''
    });
    const [mealDetail, setMealDetail] = useState([])


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/meal_chart/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setMeal({
                        ...meal,
                        date: result.data.Result[0].meal_date,
                        morning_tea: result.data.Result[0].morning_tea,
                        lunch: result.data.Result[0].lunch,
                        afternoon_tea: result.data.Result[0].afternoon_tea,
                        supervisor: result.data.Result[0].supervisor_name
                    })
                } else {
                    throw new Error(result.data.Error || 'Information data not found');
                }
            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch data');
            }).finally(() => {
                setLoading(false)
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/meal_detail/${id}`)
            .then(result => {
                if (result.data.Status) {
                    setMealDetail(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [id])




    const handleDelete = (id) => {
        if (window.confirm("ALERT! Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:3000/teacher/delete_childMeal/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        setMeal(mealDetail.filter(e => e.id !== id));
                        window.location.reload()
                    } else {
                        alert(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-auto p-3 m-3">
                    <div className='d-flex'>
                        <h2 className="display fw-normal p-3 m-5">{meal.date}</h2>
                        <div className="p-3">
                            <p>Supervisor: {meal.supervisor}</p>
                            <p>Morning Tea: {meal.morning_tea}</p>
                            <p>Lunch: {meal.lunch}</p>
                            <p>Afternoon tea: {meal.afternoon_tea}</p>
                        </div>
                    </div>
                    <div>
                        <Link to={`/teacher_dashboard/meal_chart/${id}/add_childMeal`} className='btn btn-lg p-2' title="Add a child to the chart"><i className="bi bi-person-fill-add text-dark"></i></Link>
                        <Link to={'/teacher_dashboard/meal_chart'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Child Name</th>
                            <th scope="col">Morning Tea</th>
                            <th scope="col">Lunch</th>
                            <th scope="col">Afternoon Tea</th>
                            <th scope='col'>Note</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mealDetail.map(e => (

                                <tr className="" key={e.id}>
                                    <td>{e.child_name}</td>
                                    <td>{e.mt_portion}</td>
                                    <td>{e.lunch_portion}</td>
                                    <td>{e.at_portion}</td>
                                    <td>{e.note}</td>
                                    <td>
                                        <Link to={`/teacher_dashboard/edit_meal_detail/${e.id}`} className='btn btn-black p-0 me-3' title='Edit'>
                                            <i className="bi bi-pen-fill"></i>
                                        </Link>
                                        <button type='button' className="btn btn-black p-0" title='Delete' onClick={() => handleDelete(e.id)}>
                                            <i className="bi bi-trash" />
                                        </button>
                                    </td>
                                </tr>

                            ))}
                    </tbody>
                </table>
                <div className='p-3'>
                    <p className="fw-light">*Amount: L-Large, M-Medium, S-Small, R-Refuse to eat</p>
                </div>
            </div>
        </div>
    );
}



export default TMealDetail
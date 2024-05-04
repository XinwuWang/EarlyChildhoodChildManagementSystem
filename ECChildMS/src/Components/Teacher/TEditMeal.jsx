import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const TEditMeal = () => {
    const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');
    const { id } = useParams()
    const [meal, setMeal] = useState({
        date: '',
        morning_tea: '',
        lunch: '',
        afternoon_tea: '',
        supervisor: teacherId
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
                        supervisor: result.data.Result[0].supervisor
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

    const handleSubmit = (e) => {
        e.preventDefault()


        const Data = {
            date: meal.date,
            morning_tea: meal.morning_tea,
            lunch: meal.lunch,
            afternoon_tea: meal.afternoon_tea,
            supervisor: teacherId,
        }

        axios.put(`http://localhost:3000/teacher/edit_meal/${id}`, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/meal_chart')
                    setTimeout(() => {
                        alert('Meal chart updated successfully');
                    }, 300);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }



    // Render loading state while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Edit Meal Chart</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='meel_date' className='form-label'>Date</label>
                        <input
                            type='date'
                            name='meal_date'
                            id='meal_date'
                            placeholder='Choose a date'
                            className='form-control rounded-0'
                            value={meal.date}
                            onChange={(e) => setMeal({ ...meal, date: e.target.value })}
                            required />
                    </div>




                    <div className='col-12'>
                        <label htmlFor='morning_tea' className='form-label'>
                            Morning Tea
                        </label>
                        <input
                            type='text'
                            name='morning_tea'
                            id='morning_tea'
                            placeholder='Enter the morning tea'
                            value={meal.morning_tea}
                            className='form-control rounded-0'
                            rows="4"
                            cols="50"
                            autoComplete='off'
                            onChange={(e) => setMeal({ ...meal, morning_tea: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='lunch' className='form-label'>
                            Lunch
                        </label>
                        <input
                            type='text'
                            name='lunch'
                            id='luncha'
                            placeholder='Enter the lunch'
                            value={meal.lunch}
                            className='form-control rounded-0'
                            rows="4"
                            cols="50"
                            autoComplete='off'
                            onChange={(e) => setMeal({ ...meal, lunch: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='afternoon_tea' className='form-label'>
                            Afternoon Tea
                        </label>
                        <input
                            type='text'
                            name='afternoon_tea'
                            id='afternoon_tea'
                            placeholder='Enter the afternoon tea'
                            value={meal.afternoon_tea}
                            className='form-control rounded-0'
                            rows="4"
                            cols="50"
                            autoComplete='off'
                            onChange={(e) => setMeal({ ...meal, afternoon_tea: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='supervisor' className='form-label'>
                            Supervisor
                        </label>
                        <input
                            type='text'
                            name='supervisor'
                            id='supervisor'
                            placeholder='Enter the afternoon tea'
                            value={teacherName}
                            className='form-control rounded-0'
                            rows="4"
                            cols="50"
                            autoComplete='off'
                            disabled />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/meal_chart'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default TEditMeal
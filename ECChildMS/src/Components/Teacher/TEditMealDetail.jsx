import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const TEditMealDetail = () => {
    const { id } = useParams()
    console.log(id)
    const [meal, setMeal] = useState({
        child_name: '',
        meal_date: '',
        meal_day: '',
        mt_portion: '',
        lunch_portion: '',
        at_portion: '',
        note: '',
    })

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/meal/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setMeal({
                        ...meal,
                        child_name: result.data.Result[0].child_name,
                        meal_date: result.data.Result[0].meal_date,
                        meal_day: result.data.Result[0].meal_day,
                        mt_portion: result.data.Result[0].mt_portion,
                        lunch_portion: result.data.Result[0].lunch_portion,
                        at_portion: result.data.Result[0].at_portion,
                        note: result.data.Result[0].note
                    })
                    console.log(result.data.Result)
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
            mt_portion: meal.mt_portion,
            lunch_portion: meal.lunch_portion,
            at_portion: meal.at_portion,
            note: meal.note
        }

        axios.put(`http://localhost:3000/teacher/edit_meal_detail/${id}`, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/meal_detail/' + meal.meal_day)
                    setTimeout(() => {
                        alert('Meal detail updated successfully');
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
                <h3 className='text-center'>Edit a Record</h3>
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12 '>
                        <p>*Amount: L-Large, M-Medium, S-Small, R-Refuse to eat</p>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Child</strong>
                        </label>
                        <input
                            type='text'
                            name='child'
                            id='child'
                            value={meal.child_name}
                            className='form-control rounded-0'
                            readOnly />
                    </div>
                    <div>
                        <label htmlFor='meal_date' className='form-label'><strong>Date</strong></label>
                        <input
                            type='date'
                            name='meal_date'
                            id='meal_date'
                            value={meal.meal_date}
                            className='form-control rounded-0'
                            readOnly />
                    </div>

                    <div className='col-12'>
                        <label htmlFor='mt_portion' className='form-label'><strong>Morning Tea Portion</strong></label>
                        <input
                            type='text'
                            name='mt_portion'
                            id='mt_portion'
                            value={meal.mt_portion}
                            className='form-control rounded-0'
                            onChange={(e) => setMeal({ ...meal, mt_portion: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='lunch_portion' className='form-label'>
                            <strong>Lunch Portion</strong>
                        </label>
                        <input
                            type='text'
                            name='lunch_portion'
                            id='lunch_portion'
                            value={meal.lunch_portion}
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setMeal({ ...meal, lunch_portion: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='at_portion' className='form-label'>
                            <strong>Afternoon Tea Portion</strong>
                        </label>
                        <input
                            type='text'
                            name='at_portion'
                            id='at_portion'
                            value={meal.at_portion}
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setMeal({ ...meal, at_portion: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='note' className='form-label'>
                            <strong>Note</strong>
                        </label>
                        <input
                            type='text'
                            name='note'
                            id='note'
                            value={meal.note}
                            placeholder='Enter a note'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setMeal({ ...meal, note: e.target.value })}
                        />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={`/teacher_dashboard/meal_detail/${meal.meal_day}`} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TEditMealDetail
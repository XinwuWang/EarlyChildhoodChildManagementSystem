import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const TAddMeal = () => {
    const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');
    const [meal, setMeal] = useState({
        date: '',
        morning_tea: '',
        lunch: '',
        afternoon_tea: '',
        supervisor: teacherId,
    });
    const navigate = useNavigate()





    const handleSubmit = (e) => {
        e.preventDefault()

        const Data = {
            date: meal.date,
            morning_tea: meal.morning_tea,
            lunch: meal.lunch,
            afternoon_tea: meal.afternoon_tea,
            supervisor: meal.supervisor
        }




        axios.post('http://localhost:3000/teacher/add_meal', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/meal_chart')
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
                <h3 className='text-center'>Add a Meal Chart</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='date' className='form-label'><strong>Date</strong></label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            placeholder='Enter a title'
                            className='form-control rounded-0'
                            onChange={(e) => setMeal({ ...meal, date: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='morning_tea' className='form-label'><strong>Morning Tea</strong></label>
                        <input
                            type='text'
                            name='morning_tea'
                            id='morning_tea'
                            placeholder='Enter the morning tea'
                            className='form-control rounded-0'
                            onChange={(e) => setMeal({ ...meal, morning_tea: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='lunch' className='form-label'>
                            <strong>Lunch</strong>
                        </label>
                        <input
                            type='text'
                            name='lunch'
                            id='lunch'
                            placeholder='Enter the lunch'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setMeal({ ...meal, lunch: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='afternoon_tea' className='form-label'>
                            <strong>Afternoon Tea</strong>
                        </label>
                        <input
                            type='text'
                            name='afternoon_tea'
                            id='afternoon_tea'
                            placeholder='Enter the afternoon tea'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setMeal({ ...meal, afternoon_tea: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='supervisor' className='form-label'>
                            <strong>Supervisor</strong>
                        </label>
                        <input
                            type='text'
                            name='supervisor'
                            id='supervisor'
                            value={teacherName}
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            disabled />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/meal_chart'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TAddMeal
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'


const AddChildToMeal = () => {
    const { id } = useParams()

    const [meal, setMeal] = useState({
        date_id: id,
        child_id: '',
        morning_tea: '',
        lunch: '',
        afternoon_tea: '',
        note: '',
    });
    const navigate = useNavigate()


    const [child, setChild] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/teacher/children')
            .then(result => {
                if (result.data.Status) {
                    console.log(result.data.Result)
                    setChild(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const Data = {
            date_id: meal.date_id,
            child_id: meal.child_id,
            morning_tea: meal.morning_tea,
            lunch: meal.lunch,
            afternoon_tea: meal.afternoon_tea,
            note: meal.note
        }




        axios.post('http://localhost:3000/teacher/add_childMeal', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/meal_detail/' + id)
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
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12 '>
                        <p>*Amount: L-Large, M-Medium, S-Small</p>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Child</strong>
                        </label>
                        <select name='child' id='child' className='form-select'
                            onChange={(e) => {
                                setMeal({ ...meal, child_id: e.target.value });
                            }}>
                            {
                                child.map(c => {
                                    return <option value={c.id} key={c.id}>{c.id} {c.name}</option>
                                })}
                        </select>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='morning_tea' className='form-label'><strong>Morning Tea</strong></label>
                        <input
                            type='text'
                            name='morning_tea'
                            id='morning_tea'
                            placeholder='Enter the amount eaten'
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
                            placeholder='Enter the amount eaten'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setMeal({ ...meal, lunch: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='afternoon_tea' className='form-label'>
                            <strong>Afternoon Tea</strong>
                        </label>
                        <input
                            type='text'
                            name='afternoon_tea'
                            id='afternoon_tea'
                            placeholder='Enter the amount eaten'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setMeal({ ...meal, afternoon_tea: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='note' className='form-label'>
                            <strong>Note</strong>
                        </label>
                        <input
                            type='text'
                            name='note'
                            id='note'
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
                        <Link to={'/teacher_dashboard/meal_detail/' + id} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default AddChildToMeal
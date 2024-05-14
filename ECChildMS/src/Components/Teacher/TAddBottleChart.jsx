import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const TAddBottleChart = () => {
    const navigate = useNavigate()
    const teacherId = localStorage.getItem('teacherId')
    const [bottleChart, setBottleChart] = useState({
        bottle_date: '',
        child_id: '',
        time_one: '',
        time_two: '',
        time_three: '',
        note: '',
        supervisor: teacherId
    })

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
            bottle_date: bottleChart.bottle_date,
            child_id: bottleChart.child_id,
            time_one: bottleChart.time_one,
            time_two: bottleChart.time_two,
            time_three: bottleChart.time_three,
            note: bottleChart.note,
            supervisor: bottleChart.supervisor
        }

        axios.post('http://localhost:3000/teacher/add_bottle_record', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/bottle_chart')
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
                <h3 className='text-center'>Add a Feeding Record</h3>
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='date' className='form-label'><strong>Date</strong></label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            placeholder='Choose the date'
                            className='form-control rounded-0'
                            onChange={(e) => setBottleChart({ ...bottleChart, bottle_date: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Child</strong>
                        </label>
                        <select name='child' id='child' className='form-select'
                            onChange={(e) => {
                                setBottleChart({ ...bottleChart, child_id: e.target.value });
                            }}>
                            {
                                child.map(c => {
                                    return <option value={c.id} key={c.id}>{c.id} {c.name}</option>
                                })}
                        </select>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_one' className='form-label'><strong>Time One</strong></label>
                        <input
                            type='time'
                            name='time_one'
                            id='time_one'
                            placeholder='Enter the first feeding time'
                            className='form-control rounded-0'
                            onChange={(e) => setBottleChart({ ...bottleChart, time_one: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_two' className='form-label'>
                            <strong>Time Two</strong>
                        </label>
                        <input
                            type='time'
                            name='time_two'
                            id='time_two'
                            placeholder='Enter the second feeding time'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setBottleChart({ ...bottleChart, time_two: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_three' className='form-label'>
                            <strong>Time Three</strong>
                        </label>
                        <input
                            type='time'
                            name='time_three'
                            id='time_three'
                            placeholder='Enter the third feeding time'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setBottleChart({ ...bottleChart, time_three: e.target.value })}
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
                            onChange={(e) => setBottleChart({ ...bottleChart, note: e.target.value })}
                        />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/bottle_chart'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TAddBottleChart
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const TEditBottle = () => {
    const teacherId = localStorage.getItem('teacherId');
    // const teacherName = localStorage.getItem('teacherName');
    const { id } = useParams()
    const [bottleChart, setBottleChart] = useState({
        bottle_date: '',
        child_id: '',
        child_name: '',
        time_one: '',
        time_two: '',
        time_three: '',
        note: '',
        supervisor: teacherId
    })

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/bottle_chart/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setBottleChart({
                        ...bottleChart,
                        bottle_date: result.data.Result[0].bottle_date,
                        child_id: result.data.Result[0].child,
                        child_name: result.data.Result[0].child_name,
                        time_one: result.data.Result[0].time_one,
                        time_two: result.data.Result[0].time_two,
                        time_three: result.data.Result[0].time_three,
                        note: result.data.Result[0].note,
                        supervisor: result.data.Result[0].supervisor
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
            bottle_date: bottleChart.bottle_date,
            // child_id: sleepRecord.child_id,
            time_one: bottleChart.time_one,
            time_two: bottleChart.time_two,
            time_three: bottleChart.time_three,
            note: bottleChart.note,
        }


        axios.put(`http://localhost:3000/teacher/edit_bottle_record/${id}`, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/bottle_chart')
                    setTimeout(() => {
                        alert('Sleep chart updated successfully');
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
                <h3 className='text-center'>Edit a Feeding Record</h3>
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='date' className='form-label'><strong>Date</strong></label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            placeholder='Choose the date'
                            value={bottleChart.bottle_date}
                            className='form-control rounded-0'
                            onChange={(e) => setBottleChart({ ...bottleChart, bottle_date: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Child</strong>
                        </label>
                        <input
                            type='text'
                            name='child'
                            id='child'
                            value={bottleChart.child_name}
                            className='form-control rounded-0'
                            disabled />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_one' className='form-label'><strong>Time One</strong></label>
                        <input
                            type='text'
                            name='time_one'
                            id='time_one'
                            value={bottleChart.time_one}
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
                            type='text'
                            name='time_two'
                            id='time_two'
                            value={bottleChart.time_two}
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
                            type='text'
                            name='time_three'
                            id='time_three'
                            value={bottleChart.time_three}
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
                            value={bottleChart.note}
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

export default TEditBottle
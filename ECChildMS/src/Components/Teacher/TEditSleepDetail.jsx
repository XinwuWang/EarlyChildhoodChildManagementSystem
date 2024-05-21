import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const TEditSleepDetail = () => {
    const teacherId = localStorage.getItem('teacherId');
    const { id } = useParams()
    const [sleepChart, setSleepChart] = useState({
        sleep_date: '',
        child_name: '',
        time_to_bed: '',
        time_of_sleep: '',
        time_of_wakeup: '',
        time_out_of_bed: '',
        note: '',
        supervisor: teacherId,
        supervisor_name: ''
    })

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/sleep_record_detail/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setSleepChart({
                        ...sleepChart,
                        sleep_date: result.data.Result[0].sleep_date,
                        child_name: result.data.Result[0].child_name,
                        time_to_bed: result.data.Result[0].time_to_bed,
                        time_of_sleep: result.data.Result[0].time_of_sleep,
                        time_of_wakeup: result.data.Result[0].time_of_wakeup,
                        time_out_of_bed: result.data.Result[0].time_out_of_bed,
                        note: result.data.Result[0].note,
                        supervisor: result.data.Result[0].supervisor,
                        supervisor_name: result.data.Result[0].supervisor_name
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
            time_to_bed: sleepChart.time_to_bed,
            time_of_sleep: sleepChart.time_of_sleep,
            time_of_wakeup: sleepChart.time_of_wakeup,
            time_out_of_bed: sleepChart.time_out_of_bed,
            note: sleepChart.note,
            supervisor: sleepChart.supervisor
        }


        axios.put(`http://localhost:3000/teacher/edit_sleep_detail/${id}`, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/sleep_detail/' + id)
                    setTimeout(() => {
                        alert('Sleep detail updated successfully');
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

                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Child</strong>
                        </label>
                        <input
                            type='text'
                            name='child'
                            id='child'
                            value={sleepChart.child_name}
                            className='form-control rounded-0'
                            disabled />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_to_bed' className='form-label'><strong>Time to Bed</strong></label>
                        <input
                            type='time'
                            name='time_to_bed'
                            id='time_to_bed'
                            value={sleepChart.time_to_bed}
                            className='form-control rounded-0'
                            onChange={(e) => setSleepChart({ ...sleepChart, time_to_bed: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_of_sleep' className='form-label'>
                            <strong>Time of Sleep</strong>
                        </label>
                        <input
                            type='time'
                            name='time_of_sleep'
                            id='time_of_sleep'
                            value={sleepChart.time_of_sleep}
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setSleepChart({ ...sleepChart, time_of_sleep: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_of_wakeup' className='form-label'>
                            <strong>Time of Wakeup</strong>
                        </label>
                        <input
                            type='time'
                            name='time_of_wakeup'
                            id='time_of_wakeup'
                            value={sleepChart.time_of_wakeup}
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setSleepChart({ ...sleepChart, time_of_wakeup: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='time_out_of_bed' className='form-label'>
                            <strong>Time Out of Bed</strong>
                        </label>
                        <input
                            type='time'
                            name='time_out_of_bed'
                            id='time_out_of_bed'
                            value={sleepChart.time_out_of_bed}
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setSleepChart({ ...sleepChart, time_out_of_bed: e.target.value })}
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
                            value={sleepChart.note}
                            placeholder='Enter a note'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setSleepChart({ ...sleepChart, note: e.target.value })}
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
                            value={sleepChart.supervisor_name}
                            className='form-control rounded-0'
                            disabled />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={`/teacher_dashboard/sleep_detail/${id}`} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TEditSleepDetail
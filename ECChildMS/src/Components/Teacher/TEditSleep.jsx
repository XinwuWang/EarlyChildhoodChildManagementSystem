import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const TEditSleep = () => {
    const teacherId = localStorage.getItem('teacherId');
    // const teacherName = localStorage.getItem('teacherName');
    const { id } = useParams()
    const [sleepRecord, setSleepRecord] = useState({
        sleep_date: '',
        child_id: '',
        child_name: '',
        time_to_bed: '',
        time_of_sleep: '',
        time_of_wakeup: '',
        time_out_of_bed: '',
        note: '',
        supervisor: teacherId
    })

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/sleep_record/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setSleepRecord({
                        ...sleepRecord,
                        sleep_date: result.data.Result[0].sleep_date,
                        child_id: result.data.Result[0].child,
                        child_name: result.data.Result[0].child_name,
                        time_to_bed: result.data.Result[0].time_to_bed,
                        time_of_sleep: result.data.Result[0].time_of_sleep,
                        time_of_wakeup: result.data.Result[0].time_of_wakeup,
                        time_out_of_bed: result.data.Result[0].time_out_of_bed,
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
            sleep_date: sleepRecord.sleep_date,
            // child_id: sleepRecord.child_id,
            time_to_bed: sleepRecord.time_to_bed,
            time_of_sleep: sleepRecord.time_of_sleep,
            time_of_wakeup: sleepRecord.time_of_wakeup,
            time_out_of_bed: sleepRecord.time_out_of_bed,
            note: sleepRecord.note,
        }


        axios.put(`http://localhost:3000/teacher/edit_sleep_record/${id}`, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/sleep_record')
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
                <h3 className='text-center'>Add a Sleep Record</h3>
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='date' className='form-label'><strong>Date</strong></label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            placeholder='Choose the date'
                            value={sleepRecord.sleep_date}
                            className='form-control rounded-0'
                            onChange={(e) => setSleepRecord({ ...sleepRecord, sleep_date: e.target.value })}
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
                            value={sleepRecord.child_name}
                            className='form-control rounded-0'
                            disabled />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_to_bed' className='form-label'><strong>Time to Bed</strong></label>
                        <input
                            type='text'
                            name='time_to_bed'
                            id='time_to_bed'
                            value={sleepRecord.time_to_bed}
                            placeholder='Enter the time to bed'
                            className='form-control rounded-0'
                            onChange={(e) => setSleepRecord({ ...sleepRecord, time_to_bed: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_of_sleep' className='form-label'>
                            <strong>Time of Sleep</strong>
                        </label>
                        <input
                            type='text'
                            name='time_of_sleep'
                            id='time_of_sleep'
                            value={sleepRecord.time_of_sleep}
                            placeholder='Enter the time of sleep'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setSleepRecord({ ...sleepRecord, time_of_sleep: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_of_wake' className='form-label'>
                            <strong>Time of Wake</strong>
                        </label>
                        <input
                            type='text'
                            name='time_of_wake'
                            id='time_of_wake'
                            value={sleepRecord.time_of_wakeup}
                            placeholder='Enter the time of wake'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setSleepRecord({ ...sleepRecord, time_of_wakeup: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_out_of_bed' className='form-label'>
                            <strong>Time Out of Bed</strong>
                        </label>
                        <input
                            type='text'
                            name='time_out_of_bed'
                            id='time_out_of_bed'
                            value={sleepRecord.time_out_of_bed}
                            placeholder='Enter the time out of bed'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setSleepRecord({ ...sleepRecord, time_out_of_bed: e.target.value })}
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
                            value={sleepRecord.note}
                            placeholder='Enter a note'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setSleepRecord({ ...sleepRecord, note: e.target.value })}
                        />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/sleep_record'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TEditSleep
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const TAddSleepRecord = () => {
    const navigate = useNavigate()
    const teacherId = localStorage.getItem('teacherId')
    const [sleepRecord, setSleepRecord] = useState({
        sleep_date: '',
        child_id: '',
        time_to_bed: '',
        time_of_sleep: '',
        time_of_wakeup: '',
        time_out_of_bed: '',
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
            sleep_date: sleepRecord.sleep_date,
            child_id: sleepRecord.child_id,
            time_to_bed: sleepRecord.time_to_bed,
            time_of_sleep: sleepRecord.time_of_sleep,
            time_of_wakeup: sleepRecord.time_of_wakeup,
            time_out_of_bed: sleepRecord.time_out_of_bed,
            note: sleepRecord.note,
            supervisor: sleepRecord.supervisor
        }

        axios.post('http://localhost:3000/teacher/add_sleep_record', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/sleep_record')
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
                            className='form-control rounded-0'
                            onChange={(e) => setSleepRecord({ ...sleepRecord, sleep_date: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Child</strong>
                        </label>
                        <select name='child' id='child' className='form-select'
                            onChange={(e) => {
                                setSleepRecord({ ...sleepRecord, child_id: e.target.value });
                            }}>
                            {
                                child.map(c => {
                                    return <option value={c.id} key={c.id}>{c.id} {c.name}</option>
                                })}
                        </select>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_to_bed' className='form-label'><strong>Time to Bed</strong></label>
                        <input
                            type='text'
                            name='time_to_bed'
                            id='time_to_bed'
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

export default TAddSleepRecord
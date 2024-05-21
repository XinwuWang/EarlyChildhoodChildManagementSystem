import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const TPutChildToSleep = () => {
    const { id } = useParams()
    const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');
    const [sleepChart, setSleepChart] = useState({
        sleep_date: id,
        child_id: '',
        time_to_bed: '',
        time_of_sleep: '',
        time_of_wakeup: '',
        time_out_of_bed: '',
        note: '',
        supervisor: teacherId
    });
    const navigate = useNavigate()


    const [child, setChild] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/teacher/children')
            .then(result => {
                if (result.data.Status) {
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
            sleep_date: sleepChart.sleep_date,
            child_id: sleepChart.child_id,
            time_to_bed: sleepChart.time_to_bed,
            time_of_sleep: sleepChart.time_of_sleep,
            time_of_wakeup: sleepChart.time_of_wakeup,
            time_out_of_bed: sleepChart.time_out_of_bed,
            note: sleepChart.note,
            supervisor: sleepChart.supervisor
        }




        axios.post('http://localhost:3000/teacher/put_child_to_sleep', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/sleep_detail/' + id)
                } else {
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
                <h3 className='text-center'>Add a Record</h3>
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Child</strong>
                        </label>
                        <select name='child' id='child' className='form-select'
                            onChange={(e) => {
                                setSleepChart({ ...sleepChart, child_id: e.target.value });
                            }}>
                            {
                                child.map(c => {
                                    return <option value={c.id} key={c.id}>{c.id} {c.name}</option>
                                })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='time_to_bed' className='form-label'><strong>Time to Bed</strong></label>
                        <input
                            type='time'
                            name='time_to_bed'
                            id='time_to_bed'
                            className='form-control rounded-0'
                            onChange={(e) => setSleepChart({ ...sleepChart, time_to_bed: e.target.value })}
                            required />
                    </div>
                    <div>
                        <label htmlFor='time_of_sleep' className='form-label'><strong>Time of Sleep</strong></label>
                        <input
                            type='time'
                            name='time_of_sleep'
                            id='time_of_sleep'
                            className='form-control rounded-0'
                            onChange={(e) => setSleepChart({ ...sleepChart, time_of_sleep: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='time_three' className='form-label'><strong>Time of Wakeup</strong></label>
                        <input
                            type='time'
                            name='time_of_wakeup'
                            id='time_of_wakeup'
                            className='form-control rounded-0'
                            onChange={(e) => setSleepChart({ ...sleepChart, time_of_wakeup: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='time_out_of_bed' className='form-label'><strong>Time Out of Bed</strong></label>
                        <input
                            type='time'
                            name='time_out_of_bed'
                            id='time_out_of_bed'
                            className='form-control rounded-0'
                            onChange={(e) => setSleepChart({ ...sleepChart, time_out_of_bed: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='note' className='form-label'><strong>Note</strong></label>
                        <input
                            type='text'
                            name='note'
                            id='note'
                            className='form-control rounded-0'
                            onChange={(e) => setSleepChart({ ...sleepChart, note: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='supervisor' className='form-label'><strong>Supervisor</strong></label>
                        <input
                            type='text'
                            name='supervisor'
                            id='supervisor'
                            className='form-control rounded-0'
                            placeholder={teacherName}
                            readOnly />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/sleep_detail/' + id} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TPutChildToSleep
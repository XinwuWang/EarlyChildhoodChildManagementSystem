import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const TEditSleep = () => {
    const { id } = useParams()
    const [sleepChart, setSleepChart] = useState({
        sleep_date: '',
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/sleep_record/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setSleepChart({
                        ...sleepChart,
                        sleep_date: result.data.Result[0].sleep_date,
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
            sleep_date: sleepChart.sleep_date
        }

        axios.put(`http://localhost:3000/teacher/edit_sleep_chart/${id}`, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/sleep_record')
                    setTimeout(() => {
                        alert('Sleep chart chart updated successfully');
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
                <h3 className='text-center'>Edit Sleep Chart</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='sleep_date' className='form-label'>Date</label>
                        <input
                            type='date'
                            name='sleep_date'
                            id='ssleep_date'
                            placeholder='Choose a date'
                            className='form-control rounded-0'
                            value={sleepChart.sleep_date}
                            onChange={(e) => setSleepChart({ ...sleepChart, sleep_date: e.target.value })}
                            required />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/sleep_record'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default TEditSleep
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const TEditSunblockDetail = () => {
    const teacherId = localStorage.getItem('teacherId');
    // const teacherName = localStorage.getItem('teacherName');
    const { id } = useParams()
    console.log(id)
    const [sunblockChart, setSunblockChart] = useState({
        apply_date: '',
        // sunblock_date: '',
        child_name: '',
        apply_time_one: '',
        apply_time_two: '',
        apply_time_three: '',
        note: '',
        supervisor: teacherId,
        supervisor_name: ''
    })

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/sunblock/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setSunblockChart({
                        ...sunblockChart,
                        apply_date: result.data.Result[0].apply_date,
                        // sunblock_date: result.data.Result[0].sunblock_date,
                        child_name: result.data.Result[0].child_name,
                        apply_time_one: result.data.Result[0].apply_time_one,
                        apply_time_two: result.data.Result[0].apply_time_two,
                        apply_time_three: result.data.Result[0].apply_time_three,
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
            apply_time_one: sunblockChart.apply_time_one,
            apply_time_two: sunblockChart.apply_time_two,
            apply_time_three: sunblockChart.apply_time_three,
            note: sunblockChart.note,
            supervisor: sunblockChart.supervisor
        }


        axios.put(`http://localhost:3000/teacher/edit_sunblock_detail/${id}`, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/sunblock_chart_detail/' + sunblockChart.apply_date)
                    setTimeout(() => {
                        alert('Sunblock record updated successfully');
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
                            value={sunblockChart.child_name}
                            className='form-control rounded-0'
                            disabled />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_one' className='form-label'><strong>Application Time One</strong></label>
                        <input
                            type='time'
                            name='time_one'
                            id='time_one'
                            value={sunblockChart.apply_time_one}
                            placeholder='Enter the first application time'
                            className='form-control rounded-0'
                            onChange={(e) => setSunblockChart({ ...sunblockChart, apply_time_one: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_two' className='form-label'>
                            <strong>Application Time Two</strong>
                        </label>
                        <input
                            type='time'
                            name='time_two'
                            id='time_two'
                            value={sunblockChart.apply_time_two}
                            placeholder='Enter the second application time'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setSunblockChart({ ...sunblockChart, apply_time_two: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time_three' className='form-label'>
                            <strong>Application Time Three</strong>
                        </label>
                        <input
                            type='time'
                            name='time_three'
                            id='time_three'
                            value={sunblockChart.apply_time_three}
                            placeholder='Enter the third application time'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setSunblockChart({ ...sunblockChart, apply_time_three: e.target.value })}
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
                            value={sunblockChart.note}
                            placeholder='Enter a note'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setSunblockChart({ ...sunblockChart, note: e.target.value })}
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
                            value={sunblockChart.supervisor_name}
                            className='form-control rounded-0'
                            disabled />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={`/teacher_dashboard/sunblock_chart_detail/${sunblockChart.apply_date}`} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TEditSunblockDetail
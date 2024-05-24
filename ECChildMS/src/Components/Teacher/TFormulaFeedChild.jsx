import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const TFormulaFeedChild = () => {
    const { id } = useParams()
    const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');
    const [formulaChart, setFormulaChart] = useState({
        feeding_date: id,
        child_id: '',
        time_to_bed: '',
        time_one: '',
        time_two: '',
        time_three: '',
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
            feeding_date: formulaChart.feeding_date,
            child_id: formulaChart.child_id,
            time_one: formulaChart.time_one,
            time_two: formulaChart.time_two,
            time_three: formulaChart.time_three,
            note: formulaChart.note,
            supervisor: formulaChart.supervisor
        }




        axios.post('http://localhost:3000/teacher/feed_a_child', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/formula_detail/' + id)
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
                                setFormulaChart({ ...formulaChart, child_id: e.target.value });
                            }}>
                            {
                                child.map(c => {
                                    return <option value={c.id} key={c.id}>{c.id} {c.name}</option>
                                })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='time_one' className='form-label'><strong>Time One</strong></label>
                        <input
                            type='time'
                            name='time_one'
                            id='time_one'
                            className='form-control rounded-0'
                            onChange={(e) => setFormulaChart({ ...formulaChart, time_one: e.target.value })}
                            required />
                    </div>
                    <div>
                        <label htmlFor='time_two' className='form-label'><strong>Time Two</strong></label>
                        <input
                            type='time'
                            name='time_two'
                            id='time_two'
                            className='form-control rounded-0'
                            onChange={(e) => setFormulaChart({ ...formulaChart, time_two: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='time_three' className='form-label'><strong>Time Three</strong></label>
                        <input
                            type='time'
                            name='time_three'
                            id='time_three'
                            className='form-control rounded-0'
                            onChange={(e) => setFormulaChart({ ...formulaChart, time_three: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='note' className='form-label'><strong>Note</strong></label>
                        <input
                            type='text'
                            name='note'
                            id='note'
                            className='form-control rounded-0'
                            onChange={(e) => setFormulaChart({ ...formulaChart, note: e.target.value })}
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
                        <Link to={'/teacher_dashboard/formula_detail/' + id} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TFormulaFeedChild
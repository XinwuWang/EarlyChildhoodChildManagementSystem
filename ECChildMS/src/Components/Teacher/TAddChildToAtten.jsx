import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'



const TAddChildToAtten = () => {
    const { id } = useParams()
    const teacherId = localStorage.getItem('teacherId');
    console.log(teacherId)

    const [attendance, setAttendance] = useState({
        attendance_date: id,
        child_id: '',
        time_in: '',
        time_out: '',
        teacher_signature: teacherId
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
            attendance_date: attendance.attendance_date,
            child_id: attendance.child_id,
            time_in: attendance.time_in,
            time_out: attendance.time_out,
            teacher_signature: attendance.teacher_signature
        }




        axios.post('http://localhost:3000/teacher/add_child_to_attendance', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/attendance_detail/' + id)
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
                <h3 className='text-center'>Add a Record</h3>
                <hr></hr>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Child</strong>
                        </label>
                        <select name='child' id='child' className='form-select'
                            onChange={(e) => {
                                setAttendance({ ...attendance, child_id: e.target.value });
                            }}>
                            {
                                child.map(c => {
                                    return <option value={c.id} key={c.id}>{c.id} {c.name}</option>
                                })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='time_in' className='form-label'><strong>Time In</strong></label>
                        <input
                            type='time'
                            name='time_in'
                            id='time_in'
                            placeholder='Enter the time in'
                            className='form-control rounded-0'
                            onChange={(e) => setAttendance({ ...attendance, time_in: e.target.value })}
                            required />
                    </div>
                    <div>
                        <label htmlFor='time_out' className='form-label'><strong>Time Out</strong></label>
                        <input
                            type='time'
                            name='time_out'
                            id='time_out'
                            placeholder='Enter the time out'
                            className='form-control rounded-0'
                            onChange={(e) => setAttendance({ ...attendance, time_out: e.target.value })}
                            required />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/attendance_detail/' + id} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TAddChildToAtten
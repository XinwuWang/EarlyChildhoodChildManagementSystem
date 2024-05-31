import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const TCreateSunblockForm = () => {
    const teacherId = localStorage.getItem('teacherId')
    const teacherName = localStorage.getItem('teacherName')
    const [sunblock, setSunblock] = useState({
        apply_date: '',
        person_who_created: teacherId,
    });
    const navigate = useNavigate()




    const handleSubmit = (e) => {
        e.preventDefault()

        const Data = {
            apply_date: sunblock.apply_date,
            person_who_created: sunblock.person_who_created
        }




        axios.post('http://localhost:3000/teacher/add_sunblock_chart', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/sunblock_chart')
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
                <h3 className='text-center'>Add a Sunblock Chart</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='date' className='form-label'><strong>Date</strong></label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            placeholder='Choose a date'
                            className='form-control rounded-0'
                            onChange={(e) => setSunblock({ ...sunblock, apply_date: e.target.value })}
                            required />
                    </div>
                    <div>
                        <label htmlFor='person_who_created' className='form-label'><strong>Person who created</strong></label>
                        <input
                            type='text'
                            name='person_who_created'
                            id='person_who_created'
                            value={teacherName}
                            className='form-control rounded-0'
                            disabled />
                    </div>
                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/sunblock_chart'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )

}

export default TCreateSunblockForm
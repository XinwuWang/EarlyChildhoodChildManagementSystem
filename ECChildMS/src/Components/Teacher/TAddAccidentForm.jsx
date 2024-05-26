import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const TAddAccidentForm = () => {
    const navigate = useNavigate()
    const teacherId = localStorage.getItem('teacherId')
    const [accidentForm, setAccidentForm] = useState({
        child_id: '',
        accident_date: '',
        accident_time: '',
        location_of_accident: '',
        description_of_accident: '',
        injury_assessment: '',
        medical_treatment: '',
        staff_response: '',
        additional_notes: '',
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
            child_id: accidentForm.child_id,
            accident_date: accidentForm.accident_date,
            accident_time: accidentForm.accident_time,
            location_of_accident: accidentForm.location_of_accident,
            description_of_accident: accidentForm.description_of_accident,
            injury_assessment: accidentForm.injury_assessment,
            medical_treatment: accidentForm.medical_treatment,
            staff_response: accidentForm.staff_response,
            additional_notes: accidentForm.additional_notes,
            supervisor: accidentForm.supervisor
        }

        axios.post('http://localhost:3000/teacher/add_accident_form', Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/accident_form')
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
                        <label htmlFor='date' className='form-label'><strong>Date</strong></label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            placeholder='Choose the date'
                            className='form-control rounded-0'
                            onChange={(e) => setAccidentForm({ ...accidentForm, accident_date: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='child' className='form-label'>
                            <strong>Child</strong>
                        </label>
                        <select name='child' id='child' className='form-select'
                            onChange={(e) => {
                                setAccidentForm({ ...accidentForm, child_id: e.target.value });
                            }}
                            required>
                            <option value='' disabled selected>Select a child</option>
                            {
                                child.map(c => {
                                    return <option value={c.id} key={c.id}>{c.id} {c.name}</option>
                                })}
                        </select>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time' className='form-label'><strong>Accident Time</strong></label>
                        <input
                            type='time'
                            name='time'
                            id='time'
                            placeholder='Enter the accident time'
                            className='form-control rounded-0'
                            onChange={(e) => setAccidentForm({ ...accidentForm, accident_time: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='location' className='form-label'>
                            <strong>Location of Accident</strong>
                        </label>
                        <input
                            type='text'
                            name='location'
                            id='location'
                            placeholder='Enter the location of the accident'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setAccidentForm({ ...accidentForm, location_of_accident: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='description' className='form-label'>
                            <strong>Description of Accident</strong>
                        </label>
                        <textarea
                            name='description'
                            id='description'
                            placeholder='Describe the accident'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setAccidentForm({ ...accidentForm, description_of_accident: e.target.value })}
                            required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='assessment' className='form-label'>
                            <strong>Injury Assessment</strong>
                        </label>
                        <textarea
                            name='assessment'
                            id='assessment'
                            placeholder='Assess the injury'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setAccidentForm({ ...accidentForm, injury_assessment: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='treatment' className='form-label'>
                            <strong>Medical Treatment</strong>
                        </label>
                        <textarea
                            name='treatment'
                            id='treatment'
                            placeholder='Any medical treatment given'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setAccidentForm({ ...accidentForm, medical_treatment: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='staff_response' className='form-label'>
                            <strong>Staff Response</strong>
                        </label>
                        <textarea
                            name='staff_response'
                            id='staff_response'
                            placeholder='Staff response to the accident'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setAccidentForm({ ...accidentForm, staff_response: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='note' className='form-label'>
                            <strong>Additional Notes</strong>
                        </label>
                        <textarea
                            name='note'
                            id='note'
                            placeholder='Enter a note'
                            className='form-control rounded-0'
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            onChange={(e) => setAccidentForm({ ...accidentForm, additional_notes: e.target.value })}
                        />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/accident_form'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TAddAccidentForm
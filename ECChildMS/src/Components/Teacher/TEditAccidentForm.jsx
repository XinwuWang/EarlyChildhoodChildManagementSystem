import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const TEditAccidentForm = () => {
    const { id } = useParams()
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
        supervisor: teacherId,
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/accident_form/${id}`)
            .then(result => {
                console.log(result.data)
                setAccidentForm(result.data.Result[0])

            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch data');
            }).finally(() => {
                setLoading(false)
            });
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/teacher/edit_accident_form/' + id, accidentForm)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/accident_form/' + id)
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
                        <label htmlFor='date' className='form-label'><strong>Date</strong></label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={accidentForm.accident_date}
                            placeholder='Choose the date'
                            className='form-control rounded-0'
                            onChange={(e) => setAccidentForm({ ...accidentForm, accident_date: e.target.value })}
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
                            value={accidentForm.child_name}
                            className='form-control rounded-0'
                            autoComplete='off'
                            disabled />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='time' className='form-label'><strong>Accident Time</strong></label>
                        <input
                            type='text'
                            name='time'
                            id='time'
                            value={accidentForm.accident_time}
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
                            value={accidentForm.location_of_accident}
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
                            value={accidentForm.description_of_accident}
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
                            value={accidentForm.injury_assessment}
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
                            value={accidentForm.medical_treatment}
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
                            value={accidentForm.staff_response}
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
                            value={accidentForm.additional_notes}
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
                        <Link to={'/teacher_dashboard/accident_form/' + id} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default TEditAccidentForm
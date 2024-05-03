import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import '../style.css'



const TeacherLogin = () => {
    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    axios.defaults.withCredentials = true

    // Use axios library to call the server-side app and check with credentials in the database
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/teacher/teacher_login', values)
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem('teacherId', result.data.teacherId);
                    localStorage.setItem('teacherName', result.data.teacherName);
                    console.log(result.data.teacherId)
                    console.log(result.data.teacherName)
                    // stores data that persists when users close their browser tab
                    localStorage.setItem('valid', true)
                    navigate('/teacher_dashboard')
                } else {
                    setError(result.data.Error)
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email:</strong></label>
                        <input type='email' name='email' id='email' autoComplete='off' placeholder='Enter email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='form-control rounded-0' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password:</strong></label>
                        <input type='password' name='password' id='password' placeholder='Enter password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className='form-control rounded-0' required />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <button className='btn btn-info w-100 rounded-0 mb-2' onClick={() => navigate('/')}>Go back</button>
                </form>
            </div>
        </div>
    )
}

export default TeacherLogin
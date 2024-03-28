import './style.css'



const Login = () => {
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <h2>Login</h2>
                <form>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email:</strong></label>
                        <input type='email' name='email' id='email' autoComplete='off' placeholder='Enter email'
                            className='form-control rounded-0' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password:</strong></label>
                        <input type='password' name='password' id='password' placeholder='Enter password'
                            className='form-control rounded-0' required />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Login
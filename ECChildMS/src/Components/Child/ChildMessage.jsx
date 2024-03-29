
const ChildMessage = () => {
    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Send An Email</h3>
                <form className='row g-1' >
                    <div className='col-12'>
                        <label htmlFor='inputEmail' className='form-label'>
                            Email
                        </label>
                        <input type='emaill' name='inputEmail' id='inputEmail' placeholder='Enter email' className='form-control rounded-0' autoComplete='off' required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='title' className='form-label'>
                            Title
                        </label>
                        <input type='text' id='title' placeholder='Enter a title' className='form-control rounded-0' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='title' className='form-label'>
                            Content
                        </label>
                        <textarea id='content' placeholder='Enter your content' className='form-control rounded-0'></textarea>
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-success w-100' type='submit'>Send</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ChildMessage
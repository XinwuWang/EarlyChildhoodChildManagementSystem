
const AddTeacher = () => {
    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Add Teacher</h3>
                <form className='row g-1' >
                    <div className='col-12'>
                        <label htmlFor='FullName' className='form-label'>Name</label>
                        <input type='text' name='FullName' id='FullName' placeholder='Enter name'
                            className='form-control rounded-0' required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputEmail' className='form-label'>
                            Email
                        </label>
                        <input type='emaill' name='inputEmail' id='inputEmail' placeholder='Enter email' className='form-control rounded-0' autoComplete='off' required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputPassword' className='form-label'>
                            Password
                        </label>
                        <input type='password' id='inputPassword' placeholder='Enter password' className='form-control rounded-0' required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='phoneNumber' className='form-label'>
                            Phone Number
                        </label>
                        <input type='number' id='phoneNumber' placeholder='Enter phone number' className='form-control rounded-0' required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='TRNumber' className='form-label'>
                            Teaching Registration Number
                        </label>
                        <input type='number' id='TRNumber' placeholder='Enter registration number' className='form-control rounded-0' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address' className='form-label'>
                            Address
                        </label>
                        <input type='text' id='address' placeholder='Enter home address' className='form-control rounded-0' />
                    </div>
                    <div className='col-12 mb-3'>
                        <label htmlFor='profileImage' className='form-label'>
                            Select Image
                        </label>
                        <input type='file' id='profileImage' className='form-control rounded-0' />
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-success w-100' type='submit'>Add Teacher</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default AddTeacher
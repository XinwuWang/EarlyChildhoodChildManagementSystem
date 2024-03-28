
const AddChild = () => {
    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Add Child</h3>
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
                        <label htmlFor='dadName' className='form-label'>
                            Dad&apos;s Name
                        </label>
                        <input type='text' id='dadName' placeholder='Enter the father&apos;s name' className='form-control rounded-0' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='dadPhoneNum' className='form-label'>
                            Phone Number
                        </label>
                        <input type='number' id='dadPhoneNum' placeholder='Enter phone number' className='form-control rounded-0' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='mumName' className='form-label'>
                            Mum&apos;s Name
                        </label>
                        <input type='text' id='mumName' placeholder='Enter the mother&apos;s name' className='form-control rounded-0' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='mumPhoneNum' className='form-label'>
                            Phone Number
                        </label>
                        <input type='number' id='mumPhoneNum' placeholder='Enter phone number' className='form-control rounded-0' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address' className='form-label'>
                            Home Address
                        </label>
                        <input type='text' id='address' placeholder='Enter home address' className='form-control rounded-0' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='allergy' className='form-label'>
                            Allergy
                        </label>
                        <input type='text' id='allergy' placeholder='Enter any allergy...' className='form-control rounded-0' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='interests' className='form-label'>
                            Interests & Hobbies
                        </label>
                        <input type='text' id='interests' placeholder='Any interest or hobby' className='form-control rounded-0' />
                    </div>
                    <div className='col-12 mt-4'>
                        <button className='btn btn-success w-100' type='submit'>Add Child</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default AddChild
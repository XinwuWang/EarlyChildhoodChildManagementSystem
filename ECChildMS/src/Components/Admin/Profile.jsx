import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'



const Profile = () => {
    const [admin, setAdmin] = useState([])
    const adminId = localStorage.getItem('adminId');
    useEffect(() => {
        axios.get(`http://localhost:3000/auth/profile/${adminId}`)
            .then(result => {
                console.log(result.data)
                setAdmin(result.data[0])

            })
            .catch(err => console.error("Error fetching profile data:", err))
    }, [adminId])


    return (
        // <div className="container">
        //     <div className="d-flex justify-content-center align-items-center mt-5">
        //         <div className="row">
        //             <div className="col-lg-4">
        //                 <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
        //                 <h5 className="fw-normal">Admin Name</h5>
        //                 <p><a className="btn btn-secondary" href="#">Edit</a></p>
        //             </div>
        //         </div>
        //         <div className="col-md-4">
        //             <div className="tab-content profile-tab" id="myTabContent">
        //                 <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        //                     <div className="row">
        //                         <div className="col-md-6">
        //                             <label>Admin Id</label>
        //                         </div>
        //                         <div className="col-md-6">
        //                             <p>0123</p>
        //                         </div>
        //                     </div>
        //                     <div className="row">
        //                         <div className="col-md-6">
        //                             <label>Name</label>
        //                         </div>
        //                         <div className="col-md-6">
        //                             <p>Admin 1</p>
        //                         </div>
        //                     </div>
        //                     <div className="row">
        //                         <div className="col-md-6">
        //                             <label>Email</label>
        //                         </div>
        //                         <div className="col-md-6">
        //                             <p>admin@gmail.com</p>
        //                         </div>
        //                     </div>
        //                     <div className="row">
        //                         <div className="col-md-6">
        //                             <label>Phone</label>
        //                         </div>
        //                         <div className="col-md-6">
        //                             <p>123 456 789</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header text-center">
                        <img src={`http://localhost:3000/Images/` + admin.image} alt="ray smith" className="admin_image" />
                    </div>
                    <div className="card-body text-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th scope="row">Name:</th>
                                    <td>{admin.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Staff ID:</th>
                                    <td>{admin.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email:</th>
                                    <td>{admin.email}</td>
                                </tr>
                                {/* <tr>
                                    <th scope="row">Password:</th>
                                    <td>••••••</td>
                                </tr> */}
                                <tr>
                                    <th scope="row">Date of Birth:</th>
                                    <td>{admin.date_of_birth}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Address:</th>
                                    <td>{admin.address}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Phone:</th>
                                    <td>{admin.phone}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Start Date:</th>
                                    <td>{admin.start_date}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="container pt-2 ">
                            <div className="row d-flex justify-content-center">
                                <div className="col-2 text-center">
                                    <Link to={`/dashboard/edit_profile/` + admin.id} className='btn btn-success btn-sm me-2 w-100'>Edit</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
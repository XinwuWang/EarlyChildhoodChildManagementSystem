import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'



const Profile = () => {
    const [admin, setAdmin] = useState([])
    const adminId = localStorage.getItem('adminId');
    useEffect(() => {
        axios.get(`http://localhost:3000/auth/profile/${adminId}`)
            .then(result => {
                setAdmin(result.data[0])

            })
            .catch(err => console.error("Error fetching profile data:", err))
    }, [adminId])


    return (
        <div className="container">
            <div className="container p-3">
                <div className="d-flex justify-content-between align-items-center mt-auto m-2">
                    <h1 className="display-4 fw-normal">Profile</h1>
                    <div>
                        <Link to={`/dashboard/edit_profile/` + admin.id} className='btn btn-lg p-2' title='Edit'><i className="bi bi-pencil-square"></i></Link>
                        <Link to={'/dashboard'} className='btn btn-lg p-2' title="Dashboard"><i className="bi bi-speedometer2 text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
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
                                    <th scope="row">Admin ID:</th>
                                    <td>{admin.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email:</th>
                                    <td>{admin.email}</td>
                                </tr>

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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
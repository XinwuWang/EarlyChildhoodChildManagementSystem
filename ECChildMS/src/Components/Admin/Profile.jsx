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
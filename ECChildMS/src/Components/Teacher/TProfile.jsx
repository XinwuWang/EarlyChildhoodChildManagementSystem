import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

const TProfile = () => {
    const [teacher, setTeacher] = useState([])
    const teacherId = localStorage.getItem('teacherId');

    console.log(teacherId)
    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/teacher_profile/${teacherId}`)
            .then(result => {
                console.log(result.data)
                setTeacher(result.data[0])

            })
            .catch(err => console.error("Error fetching profile data:", err))
    }, [teacherId])


    return (
        <div>
            <div className="container p-3">
                <div className="d-flex justify-content-between align-items-center mt-auto m-2">
                    <h1 className="display-4 fw-normal">Profile</h1>
                    <div>
                        <Link className='btn btn-lg p-2' to={'/teacher_dashboard/edit_profile/' + teacherId} title='Edit'><i className="bi bi-pencil-square text-dark"></i></Link>
                        <Link to={'/teacher_dashboard'} className='btn btn-lg p-2' title="Dashboard"><i className="bi bi-speedometer2 text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
            <div className="container mt-4">
                {teacher && Object.keys(teacher).length > 0 ? (
                    <div className="card">
                        <div>
                            <div className="card-header text-center">

                                <img src={'http://localhost:3000/Images/' + teacher.image} alt={teacher.name} className="teacher_image" />
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th scope="row">Name:</th>
                                        <td>{teacher.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Teacher ID:</th>
                                        <td>{teacher.id}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Teaching Registration Number:</th>
                                        <td>{teacher.teaching_No}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email:</th>
                                        <td>{teacher.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Date of Birth:</th>
                                        <td>{teacher.date_of_birth}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Phone:</th>
                                        <td>{teacher.phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Address:</th>
                                        <td>{teacher.address}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Start Date:</th>
                                        <td>{teacher.start_date}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Teaching Philosophy:</th>
                                        <td>{teacher.teaching_philosophy}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="p-3"></div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>

    )
}

export default TProfile
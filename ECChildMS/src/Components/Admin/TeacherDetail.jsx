import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const TeacherDetail = () => {
    const [teacher, setTeacher] = useState([])
    const navigate = useNavigate()

    const { id } = useParams()
    useEffect(() => {
        axios.get('http://localhost:3000/auth/manageteachers/' + id)
            .then(result => {
                console.log(result.data)
                setTeacher(result.data[0])

            })
            .catch(err => console.log(err))
    }, [id])

    const handleDelete = (id) => {
        // Display confirmation dialog
        if (window.confirm("ALERT! Are you sure you want to delete this teacher?")) {
            axios.delete('http://localhost:3000/auth/delete_teacher/' + id)
                .then(result => {
                    if (result.data.Status) {
                        setTeacher({});
                        navigate('/dashboard/manageteachers')
                    } else {
                        alert(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
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
                                        <th scope="row">Staff ID:</th>
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
                            <div className="container pt-2 ">
                                <div className='col-12 pt-3'>
                                    <div className="d-flex justify-content-center">
                                        <Link className='btn btn-success me-2' to={'/dashboard/edit_teacher/' + id}>Edit</Link>
                                        <Link to={'/dashboard/manageteachers'} className="btn btn-secondary me-2">Return</Link>
                                        <button type='button' className="btn btn-danger p-2" title='Remove this teacher' onClick={() => handleDelete(teacher.id)}>
                                            <i className="bi bi-trash" /> Delete
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>

    )
}

export default TeacherDetail
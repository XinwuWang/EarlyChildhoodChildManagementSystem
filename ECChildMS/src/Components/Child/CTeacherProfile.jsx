import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"


const TeacherProfile = () => {
    const [teacher, setTeacher] = useState([])

    const { id } = useParams()
    useEffect(() => {
        axios.get('http://localhost:3000/child/teacher/' + id)
            .then(result => {
                setTeacher(result.data[0])

            })
            .catch(err => console.log(err))
    }, [id])



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
                                        <th scope="row">Teaching Registration Number:</th>
                                        <td>{teacher.teaching_No}</td>
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
                                        <Link to={'/child_dashboard/teachers'} className="btn btn-secondary me-2">Return</Link>
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

export default TeacherProfile
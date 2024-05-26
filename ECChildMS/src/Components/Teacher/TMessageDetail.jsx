import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"


const TMessageDetail = () => {
    const teacherId = localStorage.getItem('teacherId')
    const navigate = useNavigate()
    const [messageDetail, setMessageDetail] = useState([])
    const { id } = useParams()
    useEffect(() => {
        axios.get('http://localhost:3000/teacher/message_detail/' + id)
            .then(result => {
                setMessageDetail(result.data.Result[0])

            })
            .catch(err => console.log(err))
    }, [id])

    const handleDelete = (id) => {
        if (window.confirm("ALERT! Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:3000/teacher/delete_message/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        navigate(`/teacher_dashboard/message/${teacherId}`);
                    } else {
                        alert(result.data.Error);
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body text-start">
                        <h2 className="display-5 link-body-emphasis mb-1">{messageDetail.title}</h2>
                        <p className="blog-post-meta">{messageDetail.sent_time} on {messageDetail.sent_date} from {messageDetail.sender_name}</p>
                        <hr />
                        <p>{messageDetail.content}</p>
                        <div className="container pt-2 ">
                            <div className='col-12 pt-3'>
                                <div className="d-flex justify-content-center">
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-success dropdown-toggle me-2"
                                            type="button"
                                            id="replyDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Reply
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="replyDropdown">
                                            <li>
                                                <Link className="dropdown-item" to="/teacher_dashboard/message_admin">
                                                    Admin
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/teacher_dashboard/message_a_teacher">
                                                    Teacher
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/teacher_dashboard/message_a_child">
                                                    Child
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <button className='btn btn-danger me-2' onClick={() => handleDelete(id)}>Delete</button>
                                    <Link to={`/teacher_dashboard/message/${teacherId}`} className="btn btn-secondary me-2" >Return</Link>
                                </div>

                            </div>
                        </div>
                    </div >
                </div >

            </div >
        </div >

    )
}

export default TMessageDetail
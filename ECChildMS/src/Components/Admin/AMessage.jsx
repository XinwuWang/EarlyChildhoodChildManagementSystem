import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const AMessage = () => {
    const [message, setMessage] = useState([])
    const adminId = localStorage.getItem('adminId')

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/message/${adminId}`)
            .then(result => {
                if (result.data.Status) {
                    setMessage(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-auto p-3 m-3">
                    <h1 className="display-4 fw-normal">Message</h1>
                    <div>
                        <Link to={'/dashboard/message_a_teacher'} className='btn btn-lg p-2' title="Message a teacher"><i className="bi bi-person-standing text-dark"></i></Link>
                        <Link to={'/dashboard/message_a_child'} className='btn btn-lg p-2' title="Message a child"><i className="bi bi-person-arms-up text-dark"></i></Link>
                        <Link to={'/dashboard'} className='btn btn-lg p-2' title="Return to dashboard"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
            <div className="table-responsive small">
                <table className="table table-striped table-sm m-2">
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">From</th>
                            <th scope="col">Title</th>
                            <th scope="col"></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            message.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>
                                    <td>{e.sent_date}</td>
                                    <td>{e.sent_time}</td>
                                    <td>{e.sender_name}</td>
                                    <td>{e.title}</td>
                                    <td>
                                        <Link to={`/dashboard/message_detail/${e.id}`} className='text-black' title='Edit'>
                                            <small>View more »</small>
                                        </Link>

                                    </td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default AMessage
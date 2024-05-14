import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const TAttendance = () => {
    const [attendance, setAttendance] = useState([])


    useEffect(() => {
        axios.get('http://localhost:3000/teacher/attendance')
            .then(result => {
                if (result.data.Status) {
                    setAttendance(result.data.Result)
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
                    <h1 className="display-4 fw-normal">Attendance</h1>
                    <div>
                        <Link to={'/teacher_dashboard/document'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
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
                            <th scope="col">Created by</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendance.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>

                                    <td><Link
                                        to={`/teacher_dashboard/attendance_detail/${e.id}`
                                        }
                                    >{e.form_date}</Link></td>
                                    <td>{e.creator_name}</td>
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

export default TAttendance
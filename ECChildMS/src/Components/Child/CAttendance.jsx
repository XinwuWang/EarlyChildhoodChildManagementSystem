import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'

const CAttendance = () => {
    const { id } = useParams()
    const childName = localStorage.getItem('childName')
    const [attendance, setAttendance] = useState([])



    useEffect(() => {
        axios.get('http://localhost:3000/child/attendance/' + id)
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
                    <h5 className="display-4 fw-normal">Attendance Record for {childName}</h5>
                    <div>
                        <Link to={`/child_dashboard/attendance/${id}/sign_in`} className='btn btn-lg p-2' title="Sign In"><i className="bi bi-person-fill-up text-dark"></i></Link>
                        <Link to={`/child_dashboard/attendance/${id}/sign_out`} className='btn btn-lg p-2' title="Sign Out"><i className="bi bi-person-down text-dark"></i></Link>
                        <Link to={'/child_dashboard/documents'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
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
                            <th scope="col">Time In</th>
                            <th scope="col">Time Out</th>
                            <th scope="col">Person Who Signed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendance.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>
                                    <td>{e.date_of_attendance}</td>
                                    <td>{e.time_in}</td>
                                    <td>{e.time_out}</td>
                                    <td>{e.person_who_signed}</td>
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

export default CAttendance
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const TAttendanceDetail = () => {
    const { id } = useParams()
    const [attendance, setAttendance] = useState({
        form_date: '',
    });
    const [attendanceDetail, setAttendanceDetail] = useState([])


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/attendance/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    console.log(result.data.Result[0])
                    setAttendance({
                        ...attendance,
                        form_date: result.data.Result[0].form_date,
                    })
                } else {
                    throw new Error(result.data.Error || 'Information data not found');
                }
            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch data');
            }).finally(() => {
                setLoading(false)
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/attendance_detail/${id}`)
            .then(result => {
                if (result.data.Status) {
                    console.log(result)
                    setAttendanceDetail(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [id])






    // Render loading state while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-auto p-3 m-3">
                    <div className='p-3'>
                        <h2>Attendance - {attendance.form_date}</h2>
                    </div>
                    <div>
                        <Link to={`/teacher_dashboard/attendance/${id}/sign_in`} className='btn btn-lg p-2' title="Sign In"><i className="bi bi-person-fill-up text-dark"></i></Link>
                        <Link to={`/teacher_dashboard/attendance/${id}/sign_out`} className='btn btn-lg p-2' title="Sign Out"><i className="bi bi-person-down text-dark"></i></Link>
                        <Link to={'/teacher_dashboard/attendance'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Child Name</th>
                            <th scope="col">Time In</th>
                            <th scope="col">Time Out</th>
                            <th scope="col">Person Who Signed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendanceDetail.map(e => (

                                <tr className="" key={e.id}>
                                    <td>{e.child_name}</td>
                                    <td>{e.time_in}</td>
                                    <td>{e.time_out}</td>
                                    <td>{e.person_who_signed}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TAttendanceDetail
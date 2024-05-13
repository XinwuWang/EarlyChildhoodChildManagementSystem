import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const AAttendanceDetail = () => {
    // const teacherId = localStorage.getItem('teacherId');
    // const teacherName = localStorage.getItem('teacherName');
    const { id } = useParams()
    const [attendance, setAttendance] = useState({
        form_date: '',
        // person_who_created: '',
    });
    const [attendanceDetail, setAttendanceDetail] = useState([])


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/attendance/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    console.log(result.data.Result[0])
                    setAttendance({
                        ...attendance,
                        form_date: result.data.Result[0].form_date,
                        // person_who_created: result.data.Result[0].person_who_created
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
        axios.get(`http://localhost:3000/auth/attendance_detail/${id}`)
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




    const handleDelete = (id) => {
        if (window.confirm("ALERT! Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:3000/auth/delete_attendance_record/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        setAttendance(attendanceDetail.filter(e => e.id !== id));
                        window.location.reload()
                    } else {
                        alert(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    // Render loading state while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-auto p-3 m-3">
                    <div className='p-3'>
                        <h2>{attendance.form_date}</h2>
                        {/* <p>Created by: {attendance.person_who_creator}</p> */}
                    </div>
                    <div>
                        <Link to={`/dashboard/attendance/${id}/add_child_to_attendance`} className='btn btn-lg p-2' title="Add a child to the chart"><i className="bi bi-person-fill-add text-dark"></i></Link>
                        <Link to={'/dashboard/attendance'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
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
                            <th scope='col'></th>
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
                                    <td><button type='button' className="btn btn-black p-0" title='Delete' onClick={() => handleDelete(e.id)}>
                                        <i className="bi bi-trash" />
                                    </button></td>
                                </tr>

                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AAttendanceDetail
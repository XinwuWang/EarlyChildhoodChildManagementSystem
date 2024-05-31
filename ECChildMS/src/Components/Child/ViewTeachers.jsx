import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


const ViewTeachers = () => {
    const [teacher, setTeacher] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/child/teachers')
            .then(result => {
                if (result.data.Status) {
                    setTeacher(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="container p-3">
                <div className="d-flex justify-content-between align-items-center mt-auto m-2">
                    <h1 className="display-4 fw-normal">Teacher List</h1>
                    <div>
                        <Link to={'/child_dashboard'} className='btn btn-lg p-2' title="Dashboard"><i className="bi bi-speedometer2 text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
            <div className='px-5'>

                <div className="row pt-2 align-items-center">
                    {
                        teacher.map(e => (
                            <div className="col-lg-4 pt-5" key={e.id}>
                                <img
                                    src={'http://localhost:3000/Images/' + e.image}
                                    className="bd-placeholder-img rounded-circle"
                                    width="140"
                                    height="140"
                                    role="img"
                                    aria-label="Placeholder"
                                    alt="Profile Image"
                                    preserveAspectRatio="xMidYMid slice"
                                />
                                <h2 className="fw-normal">{e.name}</h2>
                                <p><Link className="btn btn-secondary" to={"/child_dashboard/teacher/" + e.id}>View details »</Link></p>
                            </div>
                        ))
                    }
                </div>
                <div className='mt-3'></div>
            </div>
        </div>
    )
}

export default ViewTeachers